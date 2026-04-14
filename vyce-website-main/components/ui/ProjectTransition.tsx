// @ts-nocheck
'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

// ====== Timing constants ======
const FADEOUT_DURATION = 1000       // ms
const READY_TIMEOUT = 1800          // ms
const UNMOUNT_FALLBACK = 3000       // ms
const EXTRA_DELAY = 100             // ms after fadeout before unmount

let triggerOverlay = null
let onAnimationCompleteCallbacks = []
let onTransitionStartCallbacks = []

const pageReadyRef = { current: false }
let currentSignalReady = null

// ====== Public API ======
export function signalProjectPageReady() {
  if (currentSignalReady) {
    currentSignalReady()
  }
}

export function registerTransitionStart(callback) {
  if (typeof callback === 'function') {
    onTransitionStartCallbacks.push(callback)
  }
}

export function registerAnimationComplete(callback) {
  if (typeof callback === 'function') {
    onAnimationCompleteCallbacks.push(callback)
  }
}

export function setImageOverlay({ img, slug, position, finalPosition, onComplete, onTransitionStart }) {
  pageReadyRef.current = false
  onTransitionStartCallbacks.forEach(callback => callback(slug))
  if (onTransitionStart) onTransitionStart()

  if (triggerOverlay) {
    triggerOverlay({ img, slug, position, finalPosition, onComplete })
  }
}

export default function ProjectTransitionOverlay() {
  const router = useRouter()
  const [state, setState] = useState(null)
  const [phase, setPhase] = useState('initial')
  const [currentOnComplete, setCurrentOnComplete] = useState(null)
  const [isPageReady, setIsPageReady] = useState(false)
  const [timeoutOccurred, setTimeoutOccurred] = useState(false)
  const [fadeoutTriggered, setFadeoutTriggered] = useState(false)

  const timeouts = useRef([])

  const clearAllTimeouts = () => {
    timeouts.current.forEach(t => clearTimeout(t))
    timeouts.current = []
  }

  const resetOverlay = () => {
    clearAllTimeouts()
    setState(null)
    setPhase('initial')
    setCurrentOnComplete(null)
    setIsPageReady(false)
    setTimeoutOccurred(false)
    setFadeoutTriggered(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    currentSignalReady = () => setIsPageReady(true)
    return () => { currentSignalReady = null }
  }, [])

  useEffect(() => {
    triggerOverlay = ({ onComplete, ...newState }) => {
      clearAllTimeouts()
      setState(newState)
      setCurrentOnComplete(() => onComplete)
      setPhase('initial')
      setIsPageReady(false)
      setTimeoutOccurred(false)
      setFadeoutTriggered(false)

      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
    return () => { triggerOverlay = null }
  }, [])

  useEffect(() => {
    if (!state || phase !== 'initial') return
    const animationSequence = async () => {
      setPhase('center')
      await new Promise(r => setTimeout(r, 800))
      setPhase('final')
    }
    animationSequence()
  }, [state, phase])

  useEffect(() => {
    if (phase !== 'final' || fadeoutTriggered) return

    const timeoutId = setTimeout(() => {
      setTimeoutOccurred(true)
    }, READY_TIMEOUT)
    timeouts.current.push(timeoutId)

    if (isPageReady || timeoutOccurred) {
      clearTimeout(timeoutId)
      setFadeoutTriggered(true)
      const id = setTimeout(() => setPhase('fadeout'), 0)
      timeouts.current.push(id)
    }

    return () => clearTimeout(timeoutId)
  }, [phase, isPageReady, timeoutOccurred, fadeoutTriggered])

  useEffect(() => {
    if (phase !== 'fadeout') return

    const completeSequence = async () => {
      await new Promise(r => setTimeout(r, FADEOUT_DURATION))
      await new Promise(r => setTimeout(r, EXTRA_DELAY))

      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''

      onAnimationCompleteCallbacks.forEach(cb => cb())
      if (currentOnComplete) currentOnComplete()

      if (state?.slug) {
        router.push(`/showcase`)
        setTimeout(() => {
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
        }, 100)
      }
    }
    completeSequence()
  }, [phase, currentOnComplete, state?.slug, router])

  useEffect(() => {
    if (phase !== 'fadeout') return

    if (isPageReady) {
      const id = setTimeout(resetOverlay, 500)
      timeouts.current.push(id)
    }
  }, [phase, isPageReady])

  if (!state) return null

  const getTransitionStyle = () => {
    const centeringTranslateX = `calc(50vw - ${state.position.width}px/2 - ${state.position.left}px)`
    const centeringTranslateY = `calc(50vh - ${state.position.height}px/2 - ${state.position.top}px)`
    const baseImageStyles = {
      borderRadius: '0px',
      objectPosition: 'center',
      transformOrigin: 'center center',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      width: state.position.width,
      height: state.position.height,
      top: state.position.top,
      left: state.position.left,
      willChange: 'transform, opacity, border-radius, width, height, top, left, object-position, filter',
    }

    switch (phase) {
      case 'initial': return { ...baseImageStyles, opacity: 1, transform: state.position.transform, transition: 'none' }
      case 'center': return { ...baseImageStyles, opacity: 1, transform: `${state.position.transform} translate(${centeringTranslateX}, ${centeringTranslateY})`, transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' }
      case 'final': return { ...baseImageStyles, opacity: 1, transform: `perspective(1000px) translate(${centeringTranslateX}, ${centeringTranslateY})`, transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' }
      case 'fadeout': return { ...baseImageStyles, opacity: 0, filter: 'blur(20px)', transform: `perspective(1000px) translate(${centeringTranslateX}, ${centeringTranslateY})`, transition: `all ${FADEOUT_DURATION}ms ease-out` }
      default: return baseImageStyles
    }
  }

  return createPortal(
    <div id="__transition-overlay" className="fixed inset-0 z-[9999]" style={{ perspective: '2000px', pointerEvents: 'none' }}>
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: (phase === 'initial' || isPageReady) ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
        }}
      />
      <div style={{ position: 'absolute', width: '100%', height: '100%', transformStyle: 'preserve-3d', perspective: '2000px' }}>
        <Image
          src={state.img}
          alt="Transition"
          className="absolute object-cover"
          style={getTransitionStyle()}
          width={state.position.width}
          height={state.position.height}
          priority
        />
      </div>
    </div>,
    document.body
  )
}
