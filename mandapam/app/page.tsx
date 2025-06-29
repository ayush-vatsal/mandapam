"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  Users,
  Bed,
  Car,
  Wifi,
  Coffee,
  Utensils,
  Camera,
  Heart,
  Star,
  Calendar,
  Clock,
  ArrowRight,
  Play,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

// 3D Floating Elements Component
function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-3, 2, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#f43f5e" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, -1, -2]}>
          <torusGeometry args={[0.4, 0.1, 16, 100]} />
          <meshStandardMaterial color="#ec4899" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, -2, 1]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#be185d" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

// 3D Text Component - Replace the entire Hero3DText function with this:
function Hero3DText() {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={textRef} position={[0, 0, -3]}>
      {/* Elegant floating ring */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 1, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#f43f5e" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      {/* Subtle accent elements */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[-2, -0.5, 1]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ec4899" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[2, -0.8, 0.5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#be185d" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  )
}

// Scroll Animation Hook
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

// Intersection Observer Hook
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

export default function MandapamWebsite() {
  const scrollY = useScrollAnimation()
  const [heroRef, heroInView] = useInView(0.3)
  const [aboutRef, aboutInView] = useInView(0.2)
  const [weddingRef, weddingInView] = useInView(0.2)
  const [hotelRef, hotelInView] = useInView(0.2)
  const [galleryRef, galleryInView] = useInView(0.2)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Header */}
      <header className="fixed top-0 z-50 w-full transition-all duration-500 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-rose-500 transition-all duration-300 group-hover:scale-110 group-hover:text-rose-400" />
              <div className="absolute inset-0 h-8 w-8 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-400/30 transition-all duration-300" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent">
              Mandapam
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Wedding Hall", "Hotel", "Gallery", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Button className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border-0 px-8 py-3 group">
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </header>

      {/* 3D Hero Section */}
      <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Mandapam Wedding Hall"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="night" />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#f43f5e" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

            <FloatingElements />
            <Hero3DText />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-20 text-center max-w-6xl mx-auto px-4 transition-all duration-1000 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent leading-tight">
              MANDAPAM
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
          </div>

          <p className="text-2xl md:text-3xl mb-6 font-light text-white/90">
            Where Dreams Meet{" "}
            <span className="text-transparent bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text">Elegance</span>
          </p>

          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-white/70 leading-relaxed">
            Experience the perfect symphony of luxury accommodation and breathtaking wedding venues. Create
            unforgettable memories in spaces designed for your most precious moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border-0 px-10 py-4 text-lg font-medium"
            >
              <span className="relative z-10 flex items-center">
                Explore Wedding Hall
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group relative overflow-hidden border-2 border-white/30 hover:border-white/50 bg-transparent hover:bg-white/10 px-10 py-4 text-lg font-medium"
            >
              <span className="flex items-center">
                View Hotel Rooms
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section with Animations */}
      <section
        ref={aboutRef}
        id="about"
        className="py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 delay-200 ${
              aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              About Mandapam
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              A premier destination combining luxury hospitality with breathtaking wedding venues. We specialize in
              creating magical experiences that transcend ordinary celebrations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Elegant Weddings",
                description:
                  "Stunning wedding halls designed to make your special day absolutely perfect with every detail carefully crafted for your unique love story.",
                delay: "delay-300",
              },
              {
                icon: Bed,
                title: "Luxury Stay",
                description:
                  "Premium hotel accommodations offering unparalleled comfort and elegance for you and your guests during your celebration.",
                delay: "delay-500",
              },
              {
                icon: Star,
                title: "Exceptional Service",
                description:
                  "Dedicated team ensuring flawless execution of your events with personalized attention to every detail that matters.",
                delay: "delay-700",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-rose-500/30 transition-all duration-500 hover:scale-105 ${
                  aboutInView ? `opacity-100 translate-y-0 ${item.delay}` : "opacity-0 translate-y-10"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10">
                  <div className="relative mx-auto mb-6">
                    <item.icon className="h-16 w-16 text-rose-500 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:text-rose-400" />
                    <div className="absolute inset-0 h-16 w-16 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-400/30 transition-all duration-300 mx-auto" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-rose-100 transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Hall Section */}
      <section
        ref={weddingRef}
        id="wedding-hall"
        className="py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              weddingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Wedding Hall
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/70">Magnificent spaces designed for your dream wedding</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`relative group transition-all duration-1000 delay-300 ${
                weddingInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Wedding Hall Interior"
                  width={800}
                  height={600}
                  className="rounded-2xl transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
            </div>

            <div
              className={`space-y-8 transition-all duration-1000 delay-500 ${
                weddingInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Grand Celebration Hall
              </h3>

              <p className="text-lg text-white/70 leading-relaxed">
                Our spacious wedding hall can accommodate up to 500 guests with elegant décor, state-of-the-art
                lighting, and premium sound systems to make your celebration an unforgettable symphony of joy and
                elegance.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, text: "Up to 500 guests" },
                  { icon: Camera, text: "Professional lighting" },
                  { icon: Utensils, text: "Catering services" },
                  { icon: Car, text: "Valet parking" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="relative">
                      <item.icon className="h-6 w-6 text-rose-500 group-hover:text-rose-400 transition-colors duration-300" />
                      <div className="absolute inset-0 h-6 w-6 bg-rose-500/20 rounded-full blur-lg group-hover:bg-rose-400/30 transition-all duration-300" />
                    </div>
                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {["Air Conditioned", "Sound System", "Stage Setup", "Bridal Suite"].map((badge) => (
                  <Badge
                    key={badge}
                    className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-white border-rose-500/30 hover:from-rose-500/30 hover:to-pink-500/30 transition-all duration-300 px-4 py-2"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Section */}
      <section
        ref={hotelRef}
        id="hotel"
        className="py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              hotelInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Hotel Accommodation
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/70">Luxury rooms and suites for your ultimate comfort</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Deluxe Room",
                description: "Perfect for couples and small families",
                image: "/placeholder.svg?height=300&width=400",
                features: [
                  { icon: Bed, text: "King Size Bed" },
                  { icon: Wifi, text: "Free WiFi" },
                  { icon: Coffee, text: "Mini Bar" },
                ],
              },
              {
                title: "Premium Suite",
                description: "Spacious suite with living area",
                image: "/placeholder.svg?height=300&width=400",
                features: [
                  { icon: Bed, text: "Separate Living Room" },
                  { icon: Wifi, text: "High-Speed Internet" },
                  { icon: Coffee, text: "Kitchenette" },
                ],
              },
              {
                title: "Bridal Suite",
                description: "Luxurious suite for the special couple",
                image: "/placeholder.svg?height=300&width=400",
                features: [
                  { icon: Heart, text: "Romantic Décor" },
                  { icon: Bed, text: "Premium Bedding" },
                  { icon: Coffee, text: "Champagne Service" },
                ],
              },
            ].map((room, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-rose-500/30 transition-all duration-700 hover:scale-105 ${
                  hotelInView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image || "/placeholder.svg"}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-rose-100 transition-colors duration-300">
                    {room.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {room.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {room.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3 group/feature">
                        <div className="relative">
                          <feature.icon className="h-5 w-5 text-rose-500 group-hover/feature:text-rose-400 transition-colors duration-300" />
                          <div className="absolute inset-0 h-5 w-5 bg-rose-500/20 rounded-full blur-lg group-hover/feature:bg-rose-400/30 transition-all duration-300" />
                        </div>
                        <span className="text-white/70 group-hover/feature:text-white transition-colors duration-300">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        ref={galleryRef}
        id="gallery"
        className="py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              galleryInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Gallery
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/70">Glimpses of our beautiful spaces and memorable celebrations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`group relative aspect-square overflow-hidden rounded-2xl transition-all duration-700 hover:scale-105 ${
                  galleryInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Image
                  src={`/placeholder.svg?height=400&width=400&text=Gallery ${i}`}
                  alt={`Gallery image ${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-rose-900/10 to-pink-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Experience Mandapam
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/70">Take a cinematic journey through our stunning facilities</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="group relative aspect-video rounded-3xl overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10">
              <video
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                poster="/placeholder.svg?height=720&width=1280&text=Video Thumbnail"
                controls
              >
                <source src="/placeholder-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-rose-500/30 rounded-full blur-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Request Section */}
      <section
        id="contact"
        className="py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/70">
              Ready to plan your perfect celebration? We're here to make it extraordinary.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-8 text-white">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, text: "123 Wedding Avenue, Celebration City, CC 12345" },
                    { icon: Phone, text: "+1 (555) 123-4567" },
                    { icon: Mail, text: "info@mandapam.com" },
                    { icon: Clock, text: "Open 24/7 for your convenience" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="relative">
                        <item.icon className="h-6 w-6 text-rose-500 group-hover:text-rose-400 transition-colors duration-300" />
                        <div className="absolute inset-0 h-6 w-6 bg-rose-500/20 rounded-full blur-lg group-hover:bg-rose-400/30 transition-all duration-300" />
                      </div>
                      <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">Why Choose Mandapam?</h3>
                <ul className="space-y-3 text-white/70">
                  {[
                    "Experienced event planning team",
                    "Customizable packages for every budget",
                    "On-site catering and decoration services",
                    "Complimentary consultation and venue tour",
                    "Flexible booking and cancellation policies",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 group">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full group-hover:scale-125 transition-transform duration-300" />
                      <span className="group-hover:text-white/90 transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5" />

                <div className="text-center mb-10 relative z-10">
                  <div className="relative mx-auto mb-6">
                    <Calendar className="h-16 w-16 text-rose-500 mx-auto" />
                    <div className="absolute inset-0 h-16 w-16 bg-rose-500/20 rounded-full blur-xl mx-auto animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Submit Your Request</h3>
                  <p className="text-white/70 leading-relaxed">
                    Fill out our detailed form to get a personalized quote and availability check for your special day.
                  </p>
                </div>

                <div className="text-center relative z-10">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border-0 px-12 py-6 text-lg font-medium mb-6 w-full"
                    asChild
                  >
                    <Link href="https://form.typeform.com/to/your-form-id" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 flex items-center justify-center">
                        Submit Request via Typeform
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </Button>
                  <p className="text-sm text-white/60">
                    Our team will respond within 24 hours with availability and pricing details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-black to-gray-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <Heart className="h-8 w-8 text-rose-500 group-hover:text-rose-400 transition-colors duration-300" />
                  <div className="absolute inset-0 h-8 w-8 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-400/30 transition-all duration-300" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent">
                  Mandapam
                </span>
              </div>
              <p className="text-white/60 leading-relaxed">
                Creating magical moments and unforgettable celebrations since 2010. Your dream wedding and luxury stay
                destination where every detail matters.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { name: "Wedding Hall", href: "#wedding-hall" },
                  { name: "Hotel Rooms", href: "#hotel" },
                  { name: "Gallery", href: "#gallery" },
                  { name: "Contact Us", href: "#contact" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/60 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
              <div className="space-y-3 text-white/60">
                {[
                  "Wedding Planning",
                  "Event Catering",
                  "Decoration Services",
                  "Photography & Videography",
                  "Luxury Accommodation",
                ].map((service) => (
                  <p key={service} className="hover:text-white/80 transition-colors duration-300">
                    {service}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-12 bg-white/10" />

          <div className="text-center">
            <p className="text-white/60">
              &copy; 2024 Mandapam. All rights reserved. | Designed with{" "}
              <Heart className="inline h-4 w-4 text-rose-500 mx-1" />
              for your special moments
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
