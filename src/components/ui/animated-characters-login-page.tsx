"use client"

/* biome-ignore-all lint/nursery/noInlineStyles: Dynamic animation uses runtime transforms and positions. */

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { BGPattern } from '@/components/ui/bg-pattern'
import { Eye, EyeOff, Mail, Sparkles } from 'lucide-react'

interface PupilProps {
  size?: number
  maxDistance?: number
  pupilColor?: string
  forceLookX?: number
  forceLookY?: number
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = 'black',
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const pupilRef = useRef<HTMLDivElement>(null)
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      setPupilPosition({ x: forceLookX, y: forceLookY })
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!pupilRef.current) return

      const pupil = pupilRef.current.getBoundingClientRect()
      const pupilCenterX = pupil.left + pupil.width / 2
      const pupilCenterY = pupil.top + pupil.height / 2

      const deltaX = e.clientX - pupilCenterX
      const deltaY = e.clientY - pupilCenterY
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance)

      const angle = Math.atan2(deltaY, deltaX)
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      setPupilPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [forceLookX, forceLookY, maxDistance])

  return (
    <div
      ref={pupilRef}
      className='rounded-full'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  )
}

interface EyeBallProps {
  size?: number
  pupilSize?: number
  maxDistance?: number
  eyeColor?: string
  pupilColor?: string
  isBlinking?: boolean
  forceLookX?: number
  forceLookY?: number
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = 'white',
  pupilColor = 'black',
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      setPupilPosition({ x: forceLookX, y: forceLookY })
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return

      const eye = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = eye.left + eye.width / 2
      const eyeCenterY = eye.top + eye.height / 2

      const deltaX = e.clientX - eyeCenterX
      const deltaY = e.clientY - eyeCenterY
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance)

      const angle = Math.atan2(deltaY, deltaX)
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      setPupilPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [forceLookX, forceLookY, maxDistance])

  return (
    <div
      ref={eyeRef}
      className='flex items-center justify-center rounded-full transition-all duration-150'
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className='rounded-full'
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  )
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mouseX, setMouseX] = useState<number>(0)
  const [mouseY, setMouseY] = useState<number>(0)
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false)
  const [isBlackBlinking, setIsBlackBlinking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)
  const [isPurplePeeking, setIsPurplePeeking] = useState(false)
  const [dotsMouse, setDotsMouse] = useState({ x: 50, y: 50, active: false })
  const lookTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true)
        setTimeout(() => {
          setIsPurpleBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())

      return blinkTimeout
    }

    const timeout = scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true)
        setTimeout(() => {
          setIsBlackBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())

      return blinkTimeout
    }

    const timeout = scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const peekInterval = setTimeout(() => {
        setIsPurplePeeking(true)
        setTimeout(() => {
          setIsPurplePeeking(false)
        }, 800)
      }, Math.random() * 3000 + 2000)

      return () => clearTimeout(peekInterval)
    }

    const resetPeek = setTimeout(() => {
      setIsPurplePeeking(false)
    }, 0)

    return () => clearTimeout(resetPeek)
  }, [password, showPassword])

  useEffect(() => {
    return () => {
      if (lookTimerRef.current !== null) {
        window.clearTimeout(lookTimerRef.current)
      }
    }
  }, [])

  const calculatePosition = (xScale: number, yScale: number) => {
    const deltaX = (mouseX - window.innerWidth / 2) * xScale
    const deltaY = (mouseY - window.innerHeight / 2) * yScale

    const faceX = Math.max(-15, Math.min(15, deltaX / 20))
    const faceY = Math.max(-10, Math.min(10, deltaY / 30))
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120))

    return { faceX, faceY, bodySkew }
  }

  const purplePos = calculatePosition(1.15, 1)
  const blackPos = calculatePosition(0.9, 1.1)
  const yellowPos = calculatePosition(0.75, 0.8)
  const orangePos = calculatePosition(0.65, 0.85)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 300))

    if (email === 'erik@gmail.com' && password === '1234') {
      alert('Login successful! Welcome, Erik!')
    } else {
      setError('Invalid email or password. Please try again.')
    }

    setIsLoading(false)
  }

  const handleDotsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setDotsMouse({ x, y, active: true })
  }

  const handleEmailFocus = () => {
    setIsTyping(true)
    setIsLookingAtEachOther(true)

    if (lookTimerRef.current !== null) {
      window.clearTimeout(lookTimerRef.current)
    }

    lookTimerRef.current = window.setTimeout(() => {
      setIsLookingAtEachOther(false)
    }, 800)
  }

  const handleEmailBlur = () => {
    setIsTyping(false)
    setIsLookingAtEachOther(false)

    if (lookTimerRef.current !== null) {
      window.clearTimeout(lookTimerRef.current)
      lookTimerRef.current = null
    }
  }

  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      <div className='relative flex flex-col gap-6 overflow-hidden bg-white px-4 py-6 text-slate-900 sm:px-8 sm:py-8 lg:justify-between lg:gap-0 lg:p-12'>

        <div className='relative z-20'>
          <div className='flex items-center gap-2 text-lg font-semibold'>
            <span>codez_devhub</span>
          </div>
        </div>

        <div className='relative z-20 flex h-[260px] items-end justify-center sm:h-[340px] lg:h-[500px]'>
          <div className='relative origin-bottom scale-[0.5] sm:scale-75 lg:scale-100' style={{ width: '550px', height: '400px' }}>
            <div
              className='absolute bottom-0 transition-all duration-700 ease-in-out'
              style={{
                left: '70px',
                width: '180px',
                height:
                  isTyping || (password.length > 0 && !showPassword)
                    ? '440px'
                    : '400px',
                backgroundColor: '#2D2D2D',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform:
                  password.length > 0 && showPassword
                    ? 'skewX(0deg)'
                    : isTyping || (password.length > 0 && !showPassword)
                      ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                      : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className='absolute flex gap-8 transition-all duration-700 ease-in-out'
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${20}px`
                      : isLookingAtEachOther
                        ? `${55}px`
                        : `${45 + purplePos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${35}px`
                      : isLookingAtEachOther
                        ? `${65}px`
                        : `${40 + purplePos.faceY}px`,
                }}
              >
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor='white'
                  pupilColor='#2D2D2D'
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor='white'
                  pupilColor='#2D2D2D'
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
              </div>
            </div>

            <div
              className='absolute bottom-0 transition-all duration-700 ease-in-out'
              style={{
                left: '240px',
                width: '120px',
                height: '310px',
                backgroundColor: '#6C3FF5',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                transform:
                  password.length > 0 && showPassword
                    ? 'skewX(0deg)'
                    : isLookingAtEachOther
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                      : isTyping || (password.length > 0 && !showPassword)
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                        : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className='absolute flex gap-6 transition-all duration-700 ease-in-out'
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${10}px`
                      : isLookingAtEachOther
                        ? `${32}px`
                        : `${26 + blackPos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${28}px`
                      : isLookingAtEachOther
                        ? `${12}px`
                        : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor='white'
                  pupilColor='#2D2D2D'
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? 0
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? -4
                        : undefined
                  }
                />
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor='white'
                  pupilColor='#2D2D2D'
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? 0
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? -4
                        : undefined
                  }
                />
              </div>
            </div>

            <div
              className='absolute bottom-0 transition-all duration-700 ease-in-out'
              style={{
                left: '0px',
                width: '240px',
                height: '200px',
                zIndex: 3,
                backgroundColor: '#FF9B6B',
                borderRadius: '120px 120px 0 0',
                transform:
                  password.length > 0 && showPassword
                    ? 'skewX(0deg)'
                    : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className='absolute flex gap-8 transition-all duration-200 ease-out'
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${50}px`
                      : `${82 + (orangePos.faceX || 0)}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${85}px`
                      : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor='#2D2D2D'
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor='#2D2D2D'
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
              </div>
            </div>

            <div
              className='absolute bottom-0 transition-all duration-700 ease-in-out'
              style={{
                left: '310px',
                width: '140px',
                height: '230px',
                backgroundColor: '#E8D754',
                borderRadius: '70px 70px 0 0',
                zIndex: 4,
                transform:
                  password.length > 0 && showPassword
                    ? 'skewX(0deg)'
                    : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className='absolute flex gap-6 transition-all duration-200 ease-out'
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${20}px`
                      : `${52 + (yellowPos.faceX || 0)}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${35}px`
                      : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor='#2D2D2D'
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor='#2D2D2D'
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
              </div>
              <div
                className='absolute h-[4px] w-20 rounded-full bg-[#2D2D2D] transition-all duration-200 ease-out'
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${10}px`
                      : `${40 + (yellowPos.faceX || 0)}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${88}px`
                      : `${88 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>
          </div>
        </div>

        <div className='relative z-20 hidden items-center gap-8 text-sm text-slate-500 lg:flex'>
          <a href='#' className='transition-colors hover:text-slate-900'>
            Data Policy
          </a>
          <a href='#' className='transition-colors hover:text-slate-900'>
            User Agreement
          </a>
          <a href='#' className='transition-colors hover:text-slate-900'>
            Help Center
          </a>
        </div>

        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:20px_20px]' />
      </div>

      <div
        className='relative isolate flex items-center justify-center overflow-hidden bg-[#0a0a0a] p-8 text-white'
        onMouseMove={handleDotsMouseMove}
        onMouseLeave={() => setDotsMouse((prev) => ({ ...prev, active: false }))}
      >
        <BGPattern
          variant='dots'
          mask='none'
          size={20}
          fill='rgba(255,255,255,0.2)'
          style={{
            backgroundPosition: `${dotsMouse.x * 0.16}px ${dotsMouse.y * 0.16}px`,
            transition: 'background-position 120ms linear',
          }}
        />
        <div
          className='pointer-events-none absolute inset-0 z-[1] transition-opacity duration-200'
          style={{
            opacity: dotsMouse.active ? 0.75 : 0,
            background: `radial-gradient(190px circle at ${dotsMouse.x}% ${dotsMouse.y}%, rgba(255,255,255,0.06), transparent 72%)`,
          }}
        />
        <div className='relative z-10 w-full max-w-[420px]'>
          <div className='mb-12 hidden items-center justify-center gap-2 text-lg font-semibold lg:hidden'>
            <div className='flex size-8 items-center justify-center rounded-lg bg-white/10'>
              <Sparkles className='size-4 text-white' />
            </div>
            <span>codez_devhub</span>
          </div>

          <div className='mb-10 text-center'>
            <h1 className='mb-2 text-3xl font-bold tracking-tight'>Welcome back!</h1>
            <p className='text-sm text-white/70'>Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-white'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='xyz@gmail.com'
                value={email}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                required
                className='h-12 border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium text-white'>
                Password
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='h-12 border-white/15 bg-white/10 pr-10 text-white placeholder:text-white/40 focus:border-white/40'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white'
                >
                  {showPassword ? (
                    <EyeOff className='size-5' />
                  ) : (
                    <Eye className='size-5' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='remember' />
                  <Label htmlFor='remember' className='cursor-pointer text-sm font-normal text-white'>
                  Keep me signed in
                </Label>
              </div>
                <a href='#' className='text-sm font-medium text-white hover:underline'>
                Reset password
              </a>
            </div>

            {error && (
              <div className='rounded-lg border border-red-900/30 bg-red-950/20 p-3 text-sm text-red-400'>
                {error}
              </div>
            )}

            <Button
              type='submit'
              className='h-12 w-full bg-white text-base font-medium text-slate-950 hover:bg-white/90 hover:text-slate-950'
              size='lg'
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Continue'}
            </Button>
          </form>

          <div className='mt-6'>
            <Button
              variant='outline'
              className='h-12 w-full border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white'
              type='button'
            >
              <Mail className='mr-2 size-5' />
              Continue with Google
            </Button>
          </div>

          <div className='mt-8 text-center text-sm text-white/70'>
            Don't have an account?{' '}
            <a href='#' className='font-medium text-white hover:underline'>
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Component = LoginPage
