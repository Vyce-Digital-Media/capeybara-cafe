// @ts-nocheck
'use client'

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { setImageOverlay } from '../ui/ProjectTransition'
import { createPortal } from 'react-dom'

import projectsData from "../../data/projects.json";

const customEase = (x) => 1 - Math.pow(1 - x, 4)

function TitleOverlay({ hoveredCard, mousePosition }) {
  if (!hoveredCard) return null
  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999] text-white text-base sm:text-lg font-medium whitespace-nowrap"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(15px, 15px)',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        willChange: 'transform,left,top',
      }}
    >
      {hoveredCard.title || `Project ${hoveredCard.id}`}
    </div>,
    document.body
  )
}

function ImageScroller3D({ cards, isTransitionActive, sideGradientWidth = 80, infiniteLoop = true }) {
  const isRestoring = useMemo(() => {
    if (typeof window === 'undefined') return false
    const target = sessionStorage.getItem('scrollTarget')
    const savedOffset = sessionStorage.getItem('sliderOffset')
    const restoreSource = sessionStorage.getItem('restoreSource')
    const currentPath = window.location.pathname
    const normalize = (p) => p ? p.replace(/\/+$/, '') : ''
    return restoreSource === 'project' && target && normalize(target) === normalize(currentPath) && !!savedOffset
  }, [])

  const [hoveredCardId, setHoveredCardId] = useState(null)
  const [clickedCard, setClickedCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasAnimated, setHasAnimated] = useState(isRestoring)
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(isRestoring)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [viewport, setViewport] = useState({ width: 1200, isMobile: false })

  const isTouchDeviceRef = useRef(false)

  useEffect(() => {
    const isTouch =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    isTouchDeviceRef.current = isTouch
    setIsTouchDevice(isTouch)
  }, [])

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setViewport({ width: w, isMobile: w < 768 })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const offsetRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, offset: 0 })
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const animationRef = useRef(null)

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const router = useRouter()

  const updateScrollPosition = (newOffset) => {
    offsetRef.current = newOffset
    if (trackRef.current) {
      if (infiniteLoop) {
        trackRef.current.style.transform = `translate3d(${newOffset}px, 0, 0)`
      } else {
        trackRef.current.style.transform = `translateX(${newOffset}px)`
      }
    }
  }

  const cardWidth = viewport.isMobile ? 150 : 300
  const cardMargin = -70
  const effectiveCardWidth = cardWidth + cardMargin

  const baseCards = cards?.length ? cards : []
  const loopCards = useMemo(() => {
    if (baseCards.length === 0) return []
    return infiniteLoop ? [...baseCards, ...baseCards, ...baseCards] : baseCards
  }, [baseCards, infiniteLoop])

  const oneSetWidth = baseCards.length * effectiveCardWidth
  const containerWidth = viewport.width
  const totalCardsWidth = baseCards.length * effectiveCardWidth
  const maxNegativeOffset = Math.min(0, containerWidth - totalCardsWidth - 150)

  useEffect(() => {
    if (isRestoring && !isInitialAnimationDone) return
    if (!isRestoring) {
      updateScrollPosition(0)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    velocityRef.current = 0
  }, [cards, isRestoring])

  useEffect(() => {
    if (isRestoring) {
      const savedOffset = sessionStorage.getItem('sliderOffset')
      if (savedOffset) {
        const offset = parseFloat(savedOffset)
        setHasAnimated(true)
        setIsInitialAnimationDone(true)
        requestAnimationFrame(() => {
          updateScrollPosition(offset)
        })
      }
      const restorationTimeout = setTimeout(() => {
        const portfolioSection = document.getElementById('portfolio')
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        sessionStorage.removeItem('scrollTarget')
        sessionStorage.removeItem('sliderOffset')
        sessionStorage.removeItem('restoreSource')
        sessionStorage.removeItem('activeTopic')
      }, 500)
      return () => clearTimeout(restorationTimeout)
    }
  }, [isRestoring])

  const lastMousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isTouchDevice) return
    const handle = (e) => {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
      requestAnimationFrame(() =>
        setMousePosition({ x: e.clientX, y: e.clientY })
      )
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [isTouchDevice])

  const detectCardUnderCursor = () => {
    if (isTouchDeviceRef.current || isDragging || !isInitialAnimationDone) return
    if (!containerRef.current) return
    if (Math.abs(velocityRef.current) > 2) {
      if (hoveredCardId !== null) setHoveredCardId(null)
      return
    }
    const { x, y } = lastMousePosRef.current
    if (x === 0 && y === 0) return
    const element = document.elementFromPoint(x, y)
    if (!element) return
    let cardElement = element.closest('[data-card-id]')
    if (cardElement) {
      const cardId = parseInt(cardElement.getAttribute('data-card-id'), 10)
      if (!isNaN(cardId) && hoveredCardId !== cardId) {
        setHoveredCardId(cardId)
      }
    }
  }

  useEffect(() => {
    if (isTouchDeviceRef.current || !isInitialAnimationDone) return
    let raf
    const loop = () => {
      detectCardUnderCursor()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isInitialAnimationDone])

  const animateMomentum = () => {
    if (Math.abs(velocityRef.current) < 0.5) {
      velocityRef.current = 0
      return
    }
    velocityRef.current *= 0.95
    let newOffset = offsetRef.current + velocityRef.current

    if (infiniteLoop) {
      if (oneSetWidth > 0) {
        while (newOffset > 0) newOffset -= oneSetWidth
        while (newOffset < -oneSetWidth * 2) newOffset += oneSetWidth
      }
    } else {
      newOffset = Math.max(maxNegativeOffset, Math.min(0, newOffset))
      if (newOffset === 0 || newOffset === maxNegativeOffset) {
        velocityRef.current = 0
      }
    }
    updateScrollPosition(newOffset)
    animationRef.current = requestAnimationFrame(animateMomentum)
  }

  const handleMouseDown = (e) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    e.preventDefault()
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      offset: offsetRef.current,
      time: Date.now()
    }
    lastXRef.current = e.clientX
    velocityRef.current = 0
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    e.stopPropagation()

    const clientX = e.clientX
    const delta = clientX - dragStartRef.current.x
    velocityRef.current = clientX - lastXRef.current
    lastXRef.current = clientX

    let newOffset = dragStartRef.current.offset + delta

    if (infiniteLoop) {
      if (oneSetWidth > 0) {
        while (newOffset > 0) newOffset -= oneSetWidth
        while (newOffset < -oneSetWidth * 2) newOffset += oneSetWidth
      }
    } else {
      newOffset = Math.max(maxNegativeOffset, Math.min(0, newOffset))
    }
    updateScrollPosition(newOffset)
  }

  const handleMouseUp = (e) => {
    if (isDragging) {
      const totalDelta = Math.abs(lastXRef.current - dragStartRef.current.x)
      const duration = Date.now() - (dragStartRef.current.time || 0)

      if (totalDelta >= 5 || duration >= 200) {
        e?.preventDefault?.()
        e?.stopPropagation?.()
      }

      if (Math.abs(velocityRef.current) > 2) {
        animationRef.current = requestAnimationFrame(animateMomentum)
      }
    }
    setIsDragging(false)
  }

  const handleCardMouseEnter = (id) => {
    if (isTouchDeviceRef.current || !isInitialAnimationDone) return
    setHoveredCardId(id)
  }
  const handleCardMouseMove = (id) => {
    if (isTouchDeviceRef.current || !isInitialAnimationDone) return
    if (hoveredCardId !== id) setHoveredCardId(id)
  }
  const handleCardMouseLeave = () => {
    if (isTouchDeviceRef.current || !isInitialAnimationDone) return
    setHoveredCardId(null)
  }

  const handleImageClick = async (card, e) => {
    if (dragStartRef.current && dragStartRef.current.time) {
      const totalDelta = Math.abs(lastXRef.current - dragStartRef.current.x)
      const duration = Date.now() - dragStartRef.current.time
      if (totalDelta >= 5 || duration >= 200) {
        return
      }
    }

    sessionStorage.setItem('scrollTarget', window.location.pathname)
    sessionStorage.setItem('sliderOffset', offsetRef.current.toString())
    sessionStorage.setItem('restoreSource', 'project')

    setHoveredCardId(null)
    setClickedCard(card)
    const rect = e.currentTarget.getBoundingClientRect()
    const targetWidth = viewport.isMobile ? 150 : 300
    const targetHeight = viewport.isMobile ? 200 : 400

    const position = {
      top: rect.top,
      left: rect.left,
      width: targetWidth,
      height: targetHeight,
      transform:
        hoveredCardId === card.id
          ? 'scale(1.05) skewY(15deg) translateX(50px)'
          : 'skewY(15deg)',
    }
    const finalPosition = {
      top: window.innerHeight / 2 - targetHeight / 2,
      left: viewport.width / 2 - targetWidth / 2,
      width: targetWidth,
      height: targetHeight,
      transform: 'none',
      objectFit: 'contain',
    }

    router.prefetch(`/showcase`)
    const animationComplete = new Promise((resolve) => {
      setImageOverlay({
        img: card.imgSrc,
        slug: card.slug,
        position,
        finalPosition,
        onComplete: () => resolve(null),
      })
    })
    await animationComplete
  }

  const handleWheel = useCallback((e) => {
    if (!infiniteLoop) return
    e.preventDefault()
    e.stopPropagation()

    const absX = Math.abs(e.deltaX)
    const absY = Math.abs(e.deltaY)
    const isHorizontal = absX > absY

    const prev = offsetRef.current
    let scrollDelta = isHorizontal ? e.deltaX : e.deltaY
    let newOffset = prev - scrollDelta

    if (infiniteLoop) {
      if (oneSetWidth > 0) {
        while (newOffset > 0) newOffset -= oneSetWidth
        while (newOffset < -oneSetWidth * 2) newOffset += oneSetWidth
      }
    } else {
      newOffset = Math.max(maxNegativeOffset, Math.min(0, newOffset))
    }

    updateScrollPosition(newOffset)
    detectCardUnderCursor()
  }, [infiniteLoop, oneSetWidth, maxNegativeOffset, updateScrollPosition, detectCardUnderCursor])

  const handleGesture = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !infiniteLoop) return
    section.addEventListener('wheel', handleWheel, { passive: false })
    section.addEventListener('gesturestart', handleGesture, { passive: false })
    section.addEventListener('gesturechange', handleGesture, { passive: false })
    section.addEventListener('gestureend', handleGesture, { passive: false })
    return () => {
      section.removeEventListener('wheel', handleWheel)
      section.removeEventListener('gesturestart', handleGesture)
      section.removeEventListener('gesturechange', handleGesture)
      section.removeEventListener('gestureend', handleGesture)
    }
  }, [handleWheel, handleGesture, infiniteLoop])

  const handleTouchStart = useCallback((e) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    e.preventDefault()
    setIsDragging(true)
    const touch = e.touches[0]
    dragStartRef.current = { x: touch.clientX, offset: offsetRef.current, time: Date.now() }
    lastXRef.current = touch.clientX
    velocityRef.current = 0
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches[0]
    const clientX = touch.clientX
    const delta = clientX - dragStartRef.current.x
    velocityRef.current = clientX - lastXRef.current
    lastXRef.current = clientX

    let newOffset = dragStartRef.current.offset + delta
    if (infiniteLoop && oneSetWidth > 0) {
      while (newOffset > 0) newOffset -= oneSetWidth
      while (newOffset < -oneSetWidth * 2) newOffset += oneSetWidth
    } else if (!infiniteLoop) {
      newOffset = Math.max(maxNegativeOffset, Math.min(0, newOffset))
    }
    updateScrollPosition(newOffset)
  }, [isDragging, infiniteLoop, oneSetWidth, maxNegativeOffset, updateScrollPosition])

  const handleTouchEnd = useCallback((e) => {
    const touchDuration = Date.now() - (dragStartRef.current.time || 0)
    const totalDelta = Math.abs(lastXRef.current - dragStartRef.current.x)

    if (isDragging) {
      e?.preventDefault?.()
      if (totalDelta < 10 && touchDuration < 300) {
        const touch = e.changedTouches[0]
        const element = document.elementFromPoint(touch.clientX, touch.clientY)
        const cardElement = element?.closest('[data-card-id]')
        if (cardElement) {
          const cardId = parseInt(cardElement.getAttribute('data-card-id'), 10)
          const card = loopCards.find(c => c.id === cardId)
          if (card) {
            handleImageClick(card, { currentTarget: cardElement })
          }
        }
      } else if (Math.abs(velocityRef.current) > 2) {
        animationRef.current = requestAnimationFrame(animateMomentum)
      }
    }
    setIsDragging(false)
  }, [isDragging, loopCards, handleImageClick, animateMomentum])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !infiniteLoop) return
    section.addEventListener('touchstart', handleTouchStart, { passive: false })
    section.addEventListener('touchmove', handleTouchMove, { passive: false })
    section.addEventListener('touchend', handleTouchEnd, { passive: false })
    return () => {
      section.removeEventListener('touchstart', handleTouchStart)
      section.removeEventListener('touchmove', handleTouchMove)
      section.removeEventListener('touchend', handleTouchEnd)
    }
  }, [infiniteLoop, handleTouchStart, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            triggerInitialAnimation()
            setHasAnimated(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4, rootMargin: '0px' }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  const triggerInitialAnimation = () => {
    if (hasAnimated || isInitialAnimationDone) return
    setHoveredCardId(null)

    const startTime = performance.now()
    const duration = 1600
    const startOffset = offsetRef.current
    const totalDistance = infiniteLoop
      ? -oneSetWidth * 0.295
      : Math.max(maxNegativeOffset * 0.5, -oneSetWidth * 0.15)

    const animate = (t) => {
      const elapsed = t - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = customEase(progress)
      let newOffset = startOffset + totalDistance * eased

      if (!infiniteLoop) {
        newOffset = Math.max(maxNegativeOffset, Math.min(0, newOffset))
      }

      updateScrollPosition(newOffset)
      if (progress < 1) requestAnimationFrame(animate)
      else setIsInitialAnimationDone(true)
    }
    requestAnimationFrame(animate)
  }

  const getHoveredCard = () => loopCards.find((c) => c.id === hoveredCardId)

  const renderCard = (card, globalIndex) => {
    const maskStyles = {
      maskImage: `
        linear-gradient(to top,
          rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 10%,
          rgba(0,0,0,1) 90%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0.5) 100%
        ),
        linear-gradient(to right,
          rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 10%,
          rgba(0,0,0,1) 90%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0.5) 100%
        )
      `,
      WebkitMaskImage: `
        linear-gradient(to top,
          rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 10%,
          rgba(0,0,0,1) 90%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0.6) 100%
        ),
        linear-gradient(to right,
          rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 10%,
          rgba(0,0,0,1) 90%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0.6) 100%
        )
      `,
      WebkitMaskComposite: 'destination-in',
      maskComposite: 'intersect',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskSize: '100% 100%',
      WebkitMaskPosition: 'center',
    }

    return (
      <div
        key={`${card.id}-${globalIndex}`}
        data-card-id={card.id}
        onClick={(e) => handleImageClick(card, e)}
        className={`inline-block w-[150px] h-[200px] md:w-[300px] md:h-[400px] flex-shrink-0 select-none transition-all duration-300 ${clickedCard?.id === card.id ? 'scale-110 opacity-0' : ''}`}
        style={{
          position: 'relative',
          marginLeft: '-70px',
          transform: hoveredCardId === card.id ? 'scale(1.05) skewY(15deg) translateX(50px)' : 'skewY(15deg)',
          transformStyle: 'preserve-3d',
          zIndex: 1000 - globalIndex,
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          backfaceVisibility: 'hidden',
          transformOrigin: 'center center',
          overflow: 'hidden',
          willChange: 'transform',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
        onMouseEnter={() => handleCardMouseEnter(card.id)}
        onMouseMove={() => handleCardMouseMove(card.id)}
        onMouseLeave={handleCardMouseLeave}
      >
        <div
          className="relative w-full h-full bg-black flex-shrink-0"
          style={{
            transform: 'translateZ(0)',
            transformStyle: 'preserve-3d',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backfaceVisibility: 'hidden',
            transformOrigin: 'center center',
            ...maskStyles
          }}
        >
          <Image
            src={card.imgSrc}
            alt={card.title || `Project ${card.id}`}
            fill
            sizes="(max-width: 768px) 150px, 300px"
            priority={globalIndex < 5}
            style={{ objectFit: 'cover', transform: 'translateZ(0)', filter: 'brightness(100%) saturate(100%)' }}
            className="pointer-events-none"
            quality={75}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      className={`w-full bg-transparent transition-opacity duration-300 ease-out relative ${infiniteLoop ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', overscrollBehavior: 'none' }}
      onMouseDown={infiniteLoop ? handleMouseDown : undefined}
      onMouseUp={infiniteLoop ? handleMouseUp : undefined}
      onMouseLeave={infiniteLoop ? handleMouseUp : undefined}
      onMouseMove={infiniteLoop ? handleMouseMove : undefined}
    >
      <div className="w-full max-w-full overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%)', zIndex: 0, filter: 'blur(140px)', transform: 'translateZ(0)', willChange: 'transform' }} />
        <div className="absolute top-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-b from-background via-background/80 to-transparent" style={{ zIndex: 2 }} />
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-background via-background/80 to-transparent" style={{ zIndex: 2 }} />

        <div
          ref={containerRef}
          className="overflow-hidden"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '50% 50%',
            padding: 'clamp(60px, 10vw, 120px) 0 clamp(80px, 12vw, 140px) 0',
            transformStyle: 'preserve-3d',
            position: 'relative',
            zIndex: 1,
            display: infiniteLoop ? 'block' : 'flex',
            justifyContent: infiniteLoop ? 'flex-start' : 'center',
          }}
        >
          <div ref={trackRef} className="inline-flex" style={{ transformStyle: 'preserve-3d', transform: 'none', willChange: infiniteLoop ? 'transform' : 'auto', justifyContent: infiniteLoop ? 'flex-start' : 'center' }}>
            {loopCards.map((card, idx) => renderCard(card, idx))}
          </div>
        </div>

        <div className={`absolute top-0 left-0 h-full pointer-events-none ${viewport.isMobile ? "" : "w-16 sm:w-24 md:w-32"}`} style={{ width: viewport.isMobile ? '30px' : undefined, background: 'linear-gradient(to right, var(--background) 0%, rgba(0,0,0,0.98) 20%, rgba(0,0,0,0.4) 60%, transparent 100%)', zIndex: 2, WebkitMaskImage: 'radial-gradient(ellipse at left, black 40%, transparent 100%)', maskImage: 'radial-gradient(ellipse at left, black 40%, transparent 100%)' }} />
        <div className={`absolute top-0 right-0 h-full pointer-events-none ${viewport.isMobile ? "" : "w-16 sm:w-24 md:w-32"}`} style={{ width: viewport.isMobile ? '30px' : undefined, background: 'linear-gradient(to left, var(--background) 0%, rgba(0,0,0,0.98) 20%, rgba(0,0,0,0.4) 60%, transparent 100%)', zIndex: 2, WebkitMaskImage: 'radial-gradient(ellipse at right, black 40%, transparent 100%)', maskImage: 'radial-gradient(ellipse at right, black 40%, transparent 100%)' }} />
      </div>

      {!isTransitionActive && !clickedCard && !isTouchDevice && (
        <TitleOverlay hoveredCard={getHoveredCard()} mousePosition={mousePosition} />
      )}
    </div>
  )
}

export default function ExploreCollection() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [viewport, setViewport] = useState({ width: 1200, isMobile: false })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setViewport({ width: w, isMobile: w < 768 })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => { setIsReady(true) }, [])

  const projects = projectsData.projects || []
  const topics = useMemo(() => [...new Set(projects.map((project) => project.topic))], [projects])
  const allCards = useMemo(() => projects.map((project, index) => ({ id: index + 1, imgSrc: project.tileImage || '/images/krakin.jpg', slug: project.slug, title: project.title, topic: project.topic })), [projects])
  const topicCards = useMemo(() => selectedTopic ? allCards.filter((c) => c.topic === selectedTopic) : allCards, [allCards, selectedTopic])

  return (
    <section className="relative z-10 overflow-hidden bg-background py-16 md:py-24" id="portfolio">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground sm:text-6xl md:text-[10rem] lg:text-[12rem] whitespace-nowrap text-center mb-12">Portfolio</h2>
        <div className="mb-8 mt-8 lg:mt-8 md:mt-10">
          {topics.length > 0 && (
            <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
              <button
                onClick={() => setSelectedTopic(null)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${selectedTopic === null ? 'bg-primary text-white shadow-lg shadow-primary/20 border-primary' : 'bg-white/5 text-foreground/70 hover:bg-white/10 border border-white/10'}`}
              >
                All Projects
              </button>
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${selectedTopic === topic ? 'bg-primary text-white shadow-lg shadow-primary/20 border-primary' : 'bg-white/5 text-foreground/70 hover:bg-white/10 border border-white/10'}`}
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          {isReady && (
            <ImageScroller3D key={selectedTopic || 'all'} cards={topicCards} viewport={viewport} infiniteLoop={topicCards.length >= 6} />
          )}
        </div>
      </div>
    </section>
  )
}
