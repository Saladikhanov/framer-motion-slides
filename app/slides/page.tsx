"use client";

import { useEffect, useState, useCallback } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Navigation direction
type Direction = 1 | -1;

const slideStyle: CSSProperties = {
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "2rem 0",
  margin: 0,
  boxSizing: "border-box",
  position: "relative",
  overflow: "auto",
};

function SlideContainer({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: Direction;
}) {
  return (
    <motion.div
      initial={{ x: direction === 1 ? 60 : -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction === 1 ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={slideStyle}
    >
      {children}
    </motion.div>
  );
}

// Presenter Notes Component
function PresenterNotes({ notes, isVisible, onToggle }: { notes: string, isVisible: boolean, onToggle: () => void }) {
  return (
    <>
      <button
        onClick={onToggle}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          width: "20px",
          height: "20px",
          padding: "0",
          fontSize: "10px",
          borderRadius: "50%",
          border: "none",
          background: isVisible ? "rgba(239, 68, 68, 0.3)" : "rgba(99, 102, 241, 0.2)",
          color: isVisible ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
          cursor: "pointer",
          zIndex: 1000,
          opacity: 0.3,
          transition: "opacity 0.2s ease"
        }}
        onMouseEnter={(e) => e.target.style.opacity = "0.8"}
        onMouseLeave={(e) => e.target.style.opacity = "0.3"}
        title={isVisible ? "Hide presenter notes" : "Show presenter notes"}
      >
        📝
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: "70px",
              right: "20px",
              width: "400px",
              maxHeight: "calc(100vh - 100px)",
              background: "rgba(0, 0, 0, 0.95)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              overflow: "auto",
              zIndex: 999,
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <h4 style={{ margin: "0 0 1rem 0", color: "#6366f1" }}>📝 Presenter Notes</h4>
            <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontFamily: "inherit" }}>
              {notes}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Animated title slide component
function TitleSlide() {
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 TITLE SLIDE - Opening Hook

KEY POINTS:
• Start with energy - "Motion makes the web feel alive!"
• Point out the animated lines - "This is what we're building today"
• Emphasize the rebrand: "Motion is the new name for Framer Motion"
• Set expectations: "We'll go from zero to hero in 30 minutes"

TALKING SCRIPT:
"Welcome everyone! Today we're diving into Motion - formerly known as Framer Motion. 

[Point to animated lines] See these smooth animations? By the end of this session, you'll know exactly how to create effects like this with just a few lines of code.

Motion isn't just another animation library - it's a production-ready solution that's used by companies like Netflix, Spotify, and Airbnb. It's framework-agnostic now, so whether you're using React, Vue, or vanilla JS, Motion has you covered.

We'll cover everything from basic animations to advanced gestures, performance optimization, and accessibility. Let's make your websites come alive!"

TIMING: 2-3 minutes
`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{
        textAlign: "center",
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
      }}>
        {/* Fullscreen animated SVG background */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            pointerEvents: "none"
          }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Single trailing line that draws and disappears */}
          <motion.path
            d="M-300,400 Q200,200 600,350 Q1000,500 1400,300 Q1800,150 2200,400"
            stroke="url(#trailingGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{
              pathLength: 1,
              opacity: [1, 1, 1, 0]
            }}
            transition={{
              duration: 8,
              delay: 2,
              ease: "easeInOut",
              times: [0, 0.5, 0.7, 1]
            }}
          />

          {/* Gradient definition for trailing effect */}
          <defs>
            <linearGradient id="trailingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
              <stop offset="70%" stopColor="rgba(139, 92, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 1)" />
            </linearGradient>
          </defs>

          {/* Simple floating dots */}
          <motion.circle
            r="4"
            fill="#6366f1"
            initial={{ cx: -300, cy: 400, opacity: 0 }}
            animate={{
              cx: [-300, 200, 600, 1000, 1400, 2200],
              cy: [400, 200, 350, 500, 300, 400],
              opacity: [0, 1, 1, 1, 0.5, 0]
            }}
            transition={{
              duration: 6,
              delay: 3,
              ease: "easeInOut"
            }}
          />

          <motion.circle
            r="3"
            fill="#8b5cf6"
            initial={{ cx: -200, cy: 350, opacity: 0 }}
            animate={{
              cx: [-200, 400, 800, 1200, 1800],
              cy: [350, 250, 400, 450, 250],
              opacity: [0, 1, 1, 0.7, 0]
            }}
            transition={{
              duration: 5,
              delay: 4,
              ease: "easeInOut"
            }}
          />

          <motion.circle
            r="2"
            fill="#ec4899"
            initial={{ cx: -100, cy: 500, opacity: 0 }}
            animate={{
              cx: [-100, 300, 700, 1100, 1600],
              cy: [500, 300, 450, 350, 500],
              opacity: [0, 1, 1, 0.6, 0]
            }}
            transition={{
              duration: 4.5,
              delay: 4.5,
              ease: "easeInOut"
            }}
          />
        </svg>

        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2
          }}
          style={{
            margin: 0,
            fontSize: "8rem",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "2rem",
            position: "relative",
            zIndex: 10,
            lineHeight: "1"
          }}
        >
          Motion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          style={{
            fontSize: "2.5rem",
            opacity: 0.8,
            marginTop: "-1rem",
            marginBottom: "2rem",
            position: "relative",
            zIndex: 10,
            fontStyle: "italic"
          }}
        >
          (formerly Framer Motion)
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: "3rem",
            opacity: 0.9,
            marginBottom: "3rem",
            position: "relative",
            zIndex: 10,
            fontWeight: "300"
          }}
        >
          Production-ready animation library
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.2,
            type: "spring",
            stiffness: 200
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
            position: "relative",
            zIndex: 10
          }}
        >
          🎨
        </motion.div>
      </div>
    </>
  );
}

// Why Motion slide component
function WhyMotionSlide() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 WHY MOTION SLIDE - The Convincer

KEY POINTS:
• This is your selling slide - make them WANT to learn Motion
• Click each point to show detailed talking points
• Emphasize real-world benefits, not just features
• Address common objections (complexity, performance, learning curve)

TALKING SCRIPT:
"Now you might be thinking - why another animation library? Let me show you why Motion is different.

[Click Developer Experience] First, the DX is incredible. Look at this code comparison...

[Click Mount/Unmount] Second, handling component lifecycle animations is a nightmare in vanilla JS...

[Click Layout] Third, FLIP animations are complex to implement manually...

[Click Gestures] Fourth, gesture handling usually requires multiple libraries...

[Click Performance] Fifth, Motion is actually FASTER than most solutions...

[Click Accessibility] Finally, accessibility is built-in, not an afterthought...

These aren't just features - they solve real problems you face every day."

TIMING: 5-7 minutes (depending on questions)
STRATEGY: Use the modal details as your talking points script!`;


  const points = [
    {
      id: "dx",
      icon: "🚀",
      title: "Better DX",
      summary: "Declarative API vs CSS keyframes",
      details: "TALKING POINTS:\n• Show side-by-side: Motion vs CSS code\n• Mention: No @keyframes, no class juggling\n• Example: initial={{ x: -100 }} vs complex CSS\n• Highlight: One component, all animation logic\n• Pain point: CSS requires separate files, timing coordination\n• Benefit: Everything in one place, easier to maintain",
      color: "#6366f1"
    },
    {
      id: "enter-exit",
      icon: "✨",
      title: "Enter/Exit",
      summary: "AnimatePresence for mount/unmount",
      details: "TALKING POINTS:\n• Demo: Add/remove items with smooth animations\n• Key insight: CSS can't animate unmounting elements\n• Show: exit animations before DOM removal\n• Use cases: Modals, notifications, route transitions\n• Technical: AnimatePresence waits for exit animation\n• Common mistake: Forgetting unique keys",
      color: "#8b5cf6"
    },
    {
      id: "layout",
      icon: "🎯",
      title: "Layout Magic",
      summary: "One-line layout prop",
      details: "TALKING POINTS:\n• Demo: Expand/collapse with smooth size changes\n• FLIP technique: First, Last, Invert, Play\n• Magic: Motion measures before/after automatically\n• Use cases: Accordion, card expansion, reordering\n• Performance: Uses transforms, not layout properties\n• Advanced: layoutId for shared element transitions",
      color: "#ec4899"
    },
    {
      id: "gestures",
      icon: "👆",
      title: "Gestures",
      summary: "Built-in hover, tap, drag",
      details: "TALKING POINTS:\n• Show: whileHover scale, whileTap feedback\n• Demo: Draggable elements with constraints\n• Built-in: No need for separate gesture libraries\n• Touch-friendly: Works on mobile out of the box\n• Customizable: dragConstraints, dragElastic\n• Advanced: onDrag callbacks, velocity tracking",
      color: "#10b981"
    },
    {
      id: "performance",
      icon: "⚡",
      title: "Performance",
      summary: "Transforms + spring physics",
      details: "TALKING POINTS:\n• GPU acceleration: Uses transform, opacity\n• Avoids: Layout thrashing (width, height, top, left)\n• Spring physics: More natural than easing curves\n• requestAnimationFrame: Smooth 60fps animations\n• Bundle size: Tree-shakeable, import only what you need\n• Optimization: will-change handling automatically",
      color: "#f59e0b"
    },
    {
      id: "a11y",
      icon: "♿",
      title: "Accessibility",
      summary: "Respects reduced motion",
      details: "TALKING POINTS:\n• Auto-detects: prefers-reduced-motion setting\n• useReducedMotion hook for custom handling\n• Inclusive by default: No extra work needed\n• Options: Disable or reduce animation intensity\n• Best practice: Always consider motion sensitivity\n• Legal: WCAG compliance for accessibility",
      color: "#8b5cf6"
    }
  ];

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Why Motion?
        </motion.h1>

        {/* Detail overlay */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
              }}
              onClick={() => setSelectedPoint(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  background: "#1a1a1a",
                  borderRadius: "1rem",
                  padding: "3rem",
                  maxWidth: "600px",
                  textAlign: "center",
                  border: `2px solid ${points.find(p => p.id === selectedPoint)?.color}`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                  {points.find(p => p.id === selectedPoint)?.icon}
                </div>
                <h2 style={{
                  fontSize: "2.5rem",
                  margin: "0 0 1rem 0",
                  color: points.find(p => p.id === selectedPoint)?.color
                }}>
                  {points.find(p => p.id === selectedPoint)?.title}
                </h2>
                <pre style={{
                  fontSize: "1.2rem",
                  opacity: 0.9,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  textAlign: "left"
                }}>
                  {points.find(p => p.id === selectedPoint)?.details}
                </pre>
                <p style={{ fontSize: "1rem", opacity: 0.6, marginTop: "2rem" }}>
                  Click anywhere to close
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          alignItems: "start"
        }}>
          {points.slice(0, 3).map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                textAlign: "center",
                cursor: "pointer",
                padding: "1.5rem",
                borderRadius: "1rem",
                border: `2px solid transparent`,
                transition: "border-color 0.2s"
              }}
              onHoverStart={() => { }}
              onHoverEnd={() => { }}
              onClick={() => setSelectedPoint(point.id)}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{point.icon}</div>
              <h3 style={{ fontSize: "1.8rem", margin: "0 0 1rem 0", color: point.color }}>
                {point.title}
              </h3>
              <p style={{ fontSize: "1.3rem", opacity: 0.8, lineHeight: 1.3 }}>
                {point.summary}
              </p>

            </motion.div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          alignItems: "start",
          marginTop: "3rem"
        }}>
          {points.slice(3, 6).map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                textAlign: "center",
                cursor: "pointer",
                padding: "1.5rem",
                borderRadius: "1rem",
                border: `2px solid transparent`,
                transition: "border-color 0.2s"
              }}
              onClick={() => setSelectedPoint(point.id)}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{point.icon}</div>
              <h3 style={{ fontSize: "1.8rem", margin: "0 0 1rem 0", color: point.color }}>
                {point.title}
              </h3>
              <p style={{ fontSize: "1.3rem", opacity: 0.8, lineHeight: 1.3 }}>
                {point.summary}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

// Better DX slide with code example
function BetterDXSlide() {
  const [showMotion, setShowMotion] = useState(true);
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 BETTER DX SLIDE - Show Don't Tell

KEY POINTS:
• This is where you prove Motion is easier than CSS
• Use the toggle to show complexity difference
• Manual trigger gives you presentation control
• Emphasize the "same result, cleaner code" message

TALKING SCRIPT:
"Let's start with developer experience. Here's the same animation in Motion vs CSS.

[Show Motion code] Look at this - 4 lines of declarative code. No keyframes, no class management, no timing functions to remember.

[Toggle to CSS] Now here's the CSS equivalent - keyframes, class management, timing calculations. And this doesn't even handle dynamic values!

[Trigger animation] Same beautiful result, but Motion handles all the complexity for you. This is what I mean by better DX.

Imagine scaling this to complex sequences, dynamic values, or interactive states. Motion keeps it simple."

TIMING: 3-4 minutes
DEMO TIP: Trigger animation multiple times to show consistency!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#6366f1" }}
        >
          🚀 Better Developer Experience
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          {/* Code comparison */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <button
                onClick={() => setShowMotion(!showMotion)}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.2rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#6366f1",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "1rem"
                }}
              >
                {showMotion ? "Show CSS Way" : "Show Motion Way"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showMotion ? (
                <motion.div
                  key="motion"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}
                >
                  <h3 style={{ color: "#10b981", marginBottom: "1rem" }}>Motion Way ✨</h3>
                  <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                    <code>{`<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Hello World!
</motion.div>`}</code>
                  </pre>
                </motion.div>
              ) : (
                <motion.div
                  key="css"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}
                >
                  <h3 style={{ color: "#ef4444", marginBottom: "1rem" }}>CSS Way 😰</h3>
                  <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                    <code>{`.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Plus className management...`}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live demo */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Live Demo</h3>

            <button
              onClick={() => setTriggerAnimation(prev => prev + 1)}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
                marginBottom: "2rem"
              }}
            >
              Trigger Animation
            </button>

            <motion.div
              key={`${showMotion ? "motion" : "css"}-${triggerAnimation}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "200px",
                height: "100px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem auto",
                fontSize: "1.5rem",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Hello World!
            </motion.div>
            <p style={{ fontSize: "1.3rem", opacity: 0.8 }}>
              Same result, cleaner code!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Enter/Exit slide
function EnterExitSlide() {
  const [items, setItems] = useState([1, 2, 3]);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 ENTER/EXIT SLIDE - AnimatePresence Magic

KEY POINTS:
• This solves a huge React pain point - animating unmounting components
• AnimatePresence is the secret sauce
• Show the before/after of adding/removing items
• Emphasize how smooth the transitions are

TALKING SCRIPT:
"One of the biggest challenges in React is animating components when they mount and unmount. Normally, when you remove a component from the DOM, it's gone instantly - no animation possible.

[Point to code] AnimatePresence solves this. It keeps components alive long enough for exit animations to complete.

[Add item] Watch this - smooth entrance animation. Motion handles the layout shifts automatically.

[Remove item] And here's the magic - smooth exit animation. The component stays in the DOM until the animation finishes, then gets removed.

This is impossible to do cleanly with CSS alone. You'd need complex state management and timing coordination."

TIMING: 3-4 minutes
DEMO TIP: Add and remove multiple items to show the staggered effects!`;

  const addItem = () => {
    const nextId = items.length === 0 ? 1 : Math.max(...items) + 1;
    setItems([...items, nextId]);
  };
  const removeItem = (id: number) => setItems(items.filter(item => item !== id));

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#8b5cf6" }}
        >
          ✨ Enter/Exit Animations
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Code */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>AnimatePresence</h3>
            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}>
              <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                <code>{`<AnimatePresence>
  {items.map(item => (
      <motion.div
      key={item}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      Item {item}
    </motion.div>
  ))}
</AnimatePresence>`}</code>
              </pre>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8, marginTop: "1rem" }}>
              CSS can't animate elements being removed from DOM!
            </p>
          </div>

          {/* Live demo */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Live Demo</h3>
            <div style={{ marginBottom: "2rem" }}>
              <button
                onClick={addItem}
                style={{
                  padding: "0.8rem 1.5rem",
                  marginRight: "1rem",
                  fontSize: "1.1rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#10b981",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Add Item
              </button>
            </div>

            <div style={{ minHeight: "300px" }}>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      padding: "1rem",
                      margin: "0.5rem 0",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "white"
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>Item {item}</span>
                    <button
                      onClick={() => removeItem(item)}
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "none",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Layout Magic slide
function LayoutMagicSlide() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 LAYOUT MAGIC SLIDE - FLIP Animations

KEY POINTS:
• FLIP = First, Last, Invert, Play - complex animation technique
• Motion does this automatically with the layout prop
• Show expand/collapse to demonstrate shared element transitions
• This is where Motion really shines vs other libraries

TALKING SCRIPT:
"Now for something really impressive - layout animations. This uses a technique called FLIP animations.

[Point to code] See this 'layout' prop? That's all it takes. Motion automatically detects layout changes and animates between them smoothly.

[Click expand] Watch this - the element smoothly transitions to its new size and position. Motion calculates the difference and animates the transform.

[Click collapse] And back again - perfect smooth transition.

Without Motion, you'd need to manually calculate positions, handle transforms, manage timing... it's complex. Motion makes it one prop."

TIMING: 2-3 minutes
DEMO TIP: Expand and collapse multiple times to show consistency!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#ec4899" }}
        >
          🎯 Layout Magic
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Code */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Just add &quot;layout&quot;</h3>
            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}>
              <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                <code>{`<motion.div
  layout
      style={{
    width: isExpanded ? 400 : 200,
    height: isExpanded ? 300 : 150,
    background: "gradient(...)"
  }}
>
  Auto FLIP animation!
</motion.div>`}</code>
              </pre>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8, marginTop: "1rem" }}>
              Motion automatically calculates and animates size/position changes
            </p>
          </div>

          {/* Live demo */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Live Demo</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "none",
                background: "#ec4899",
                color: "white",
                cursor: "pointer",
                marginBottom: "2rem"
              }}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>

            <motion.div
              layout
              style={{
                width: isExpanded ? 400 : 200,
                height: isExpanded ? 300 : 150,
                background: "linear-gradient(135deg, #ec4899, #f59e0b)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold"
              }}
            >
              {isExpanded ? "Expanded!" : "Click to expand"}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

// Gestures slide
function GesturesSlide() {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 GESTURES SLIDE - Built-in Interactions

KEY POINTS:
• No external gesture libraries needed
• whileHover, whileTap, drag - all built-in
• Show the draggable element and position tracking
• Emphasize the "no event listeners" benefit

TALKING SCRIPT:
"Motion has built-in gesture support. No need for separate libraries or complex event handling.

[Hover button] See this? whileHover prop - automatic scale and color change. No onMouseEnter/onMouseLeave needed.

[Tap button] whileTap gives instant feedback. Perfect for button interactions.

[Drag element] And here's the powerful part - drag support with constraints. Look at this position tracking - all automatic.

The drag constraints keep it in bounds, dragElastic gives it that nice bounce feel, and onDragEnd gives us the final position. All with declarative props."

TIMING: 3-4 minutes
DEMO TIP: Drag the element to different corners to show the constraints!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#10b981" }}
        >
          👆 Built-in Gestures
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Code examples */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Gesture Props</h3>
            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
              <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                <code>{`<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Hover & Tap Me
</motion.button>

      <motion.div
        drag
  dragConstraints={{
    left: 0, right: 200,
    top: 0, bottom: 200
  }}
  onDragEnd={(e, info) => {
    console.log(info.point)
  }}
/>`}</code>
              </pre>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
              No event listeners, no gesture libraries needed!
            </p>
          </div>

          {/* Live demos */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Try It Out</h3>

            {/* Hover/Tap button */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                borderRadius: "12px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
                marginBottom: "3rem",
                display: "block",
                margin: "0 auto 3rem auto"
              }}
            >
              Hover & Tap Me!
            </motion.button>

            {/* Draggable element */}
            <div style={{
              width: 250,
              height: 200,
              border: "2px dashed rgba(16, 185, 129, 0.5)",
              borderRadius: "12px",
              position: "relative",
              margin: "0 auto"
            }}>
              <motion.div
                drag
                dragConstraints={{ left: 0, top: 0, right: 190, bottom: 140 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.1, rotate: 5 }}
                onDragEnd={(_, info) => setDragPosition(info.point)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  position: "absolute",
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem"
                }}
              >
                🎯
              </motion.div>
            </div>

            <p style={{ fontSize: "1rem", opacity: 0.7, textAlign: "center", marginTop: "1rem" }}>
              Drag position: ({Math.round(dragPosition.x)}, {Math.round(dragPosition.y)})
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Performance slide
function PerformanceSlide() {
  const [animationType, setAnimationType] = useState<"good" | "bad">("good");
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 PERFORMANCE SLIDE - Speed Matters

KEY POINTS:
• Motion uses GPU-accelerated properties by default
• Show good vs bad practices
• Explain layout thrashing vs transform animations
• This addresses the "animations are slow" myth

TALKING SCRIPT:
"Let's talk performance. There's a myth that animations are slow. The truth? Bad animations are slow.

[Show good practices] Motion animates transform properties by default - x, y, scale, rotate. These are GPU-accelerated and run at 60fps.

[Toggle to bad] Here's what NOT to do - animating layout properties like left, top, width, height. These cause layout recalculations on every frame.

[Trigger animation] Same visual result, but the performance difference is huge. Motion guides you toward the fast path by making the right thing easy.

This is why Motion apps feel smooth while others feel janky."

TIMING: 3-4 minutes
DEMO TIP: Toggle between good/bad multiple times to emphasize the difference!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#f59e0b" }}
        >
          ⚡ Performance
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Code comparison */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <button
                onClick={() => setAnimationType(animationType === "good" ? "bad" : "good")}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.2rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#f59e0b",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Show {animationType === "good" ? "Bad" : "Good"} Practice
              </button>
            </div>

            <AnimatePresence mode="wait">
              {animationType === "good" ? (
                <motion.div
                  key="good"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}
                >
                  <h3 style={{ color: "#10b981", marginBottom: "1rem" }}>✅ Good Performance</h3>
                  <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                    <code>{`// Uses GPU-accelerated properties
<motion.div
  animate={{
    x: 100,           // transform: translateX
    y: 50,            // transform: translateY
    scale: 1.2,       // transform: scale
    rotate: 45,       // transform: rotate
    opacity: 0.8      // opacity
  }}
/>`}</code>
                  </pre>
                </motion.div>
              ) : (
                <motion.div
                  key="bad"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}
                >
                  <h3 style={{ color: "#ef4444", marginBottom: "1rem" }}>❌ Poor Performance</h3>
                  <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                    <code>{`// Causes layout thrashing
<motion.div
  animate={{
    left: 100,        // triggers layout
    top: 50,          // triggers layout
    width: 200,       // triggers layout
    height: 150,      // triggers layout
    marginLeft: 20    // triggers layout
  }}
/>`}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Performance demo */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Performance Demo</h3>

            <button
              onClick={() => setTriggerAnimation(prev => prev + 1)}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
                marginBottom: "2rem"
              }}
            >
              Trigger Animation
            </button>

            <motion.div
              key={`${animationType}-${triggerAnimation}`}
              initial={{
                x: animationType === "good" ? 0 : 0,
                scale: 1,
                opacity: 1
              }}
              animate={{
                x: animationType === "good" ? 100 : 100,
                scale: animationType === "good" ? 1.2 : 1.2,
                opacity: animationType === "good" ? 0.8 : 0.8
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100
              }}
              style={{
                width: 100,
                height: 100,
                background: animationType === "good"
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #ef4444, #dc2626)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem auto",
                fontSize: "2rem"
              }}
            >
              {animationType === "good" ? "⚡" : "🐌"}
            </motion.div>

            <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
              {animationType === "good"
                ? "Smooth 60fps with GPU acceleration"
                : "Janky animation causing reflows"
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Accessibility slide
function AccessibilitySlide() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 ACCESSIBILITY SLIDE - Inclusive by Design

KEY POINTS:
• prefers-reduced-motion is a real accessibility need
• Motion respects this automatically in many cases
• useReducedMotion hook for custom handling
• This is about being inclusive, not just compliant

TALKING SCRIPT:
"Finally, accessibility. Some users get dizzy or nauseous from animations. Motion takes this seriously.

[Show code] The useReducedMotion hook detects the user's system preference. You can use this to disable or reduce animations.

[Check reduced motion] Watch what happens - instead of crazy spinning and movement, we get a gentle fade. Still engaging, but accessible.

[Uncheck] And back to full animations for users who enjoy them.

This isn't just nice to have - it's required for WCAG compliance and shows you care about all users."

TIMING: 2-3 minutes
DEMO TIP: Toggle the checkbox multiple times to show the dramatic difference!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#8b5cf6" }}
        >
          ♿ Accessibility
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Code example */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Reduced Motion</h3>
            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
              <pre style={{ fontSize: "1.1rem", lineHeight: 1.4, margin: 0 }}>
                <code>{`import { useReducedMotion } from "framer-motion"

function MyComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5
      }}
    />
  )
}`}</code>
              </pre>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
              Automatically respects user's motion preferences
            </p>
          </div>

          {/* Demo */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Demo</h3>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", fontSize: "1.2rem" }}>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  style={{ transform: "scale(1.5)" }}
                />
                Simulate Reduced Motion
              </label>
            </div>

            <motion.div
              animate={reducedMotion ? {
                // Minimal motion - just a subtle fade
                opacity: [1, 0.8, 1]
              } : {
                // Full animation
                x: [0, 100, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: reducedMotion ? 3 : 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: 100,
                height: 100,
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem auto",
                fontSize: "2rem"
              }}
            >
              ♿
            </motion.div>

            <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
              {reducedMotion
                ? "Minimal motion for accessibility"
                : "Full animations for enhanced experience"
              }
            </p>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "8px" }}>
              <p style={{ fontSize: "1rem", opacity: 0.9, margin: 0 }}>
                <strong>WCAG Compliance:</strong> Respecting prefers-reduced-motion is required for accessibility standards
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Remote Control slide - trigger animations on other components
function RemoteControlSlide() {
  const [triggerCount, setTriggerCount] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 REMOTE CONTROL SLIDE - Cross-Component Animation

KEY POINTS:
• Motion animations can be triggered from anywhere in your app
• State changes automatically trigger re-animations
• Perfect for user interactions, form validation, notifications
• Shows the power of declarative animations

TALKING SCRIPT:
"Here's something really cool - you can trigger animations on any component from anywhere in your app.

[Point to button] This button doesn't contain the animations - it just updates state.

[Click button] Watch what happens - multiple components react to the same state change. The card shakes, the icon spins, the text changes color, and particles fly.

[Click multiple times] Each click triggers fresh animations. This is perfect for things like form validation errors, notification systems, or interactive feedback.

The beauty is that the animations are declarative - you just describe what should happen, and Motion handles the timing and coordination."

TIMING: 3-4 minutes
DEMO TIP: Click the button multiple times rapidly to show the animation queuing!`;

  const triggerAnimations = () => {
    setTriggerCount(prev => prev + 1);
  };

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#f97316" }}
        >
          🎮 Remote Control Animations
        </motion.h1>

        {/* Central trigger button */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            onClick={triggerAnimations}
            style={{
              padding: "1.5rem 3rem",
              fontSize: "1.5rem",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(249, 115, 22, 0.4)",
              transform: "translateY(0)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 25px rgba(249, 115, 22, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 20px rgba(249, 115, 22, 0.4)";
            }}
          >
            🎯 Trigger Remote Animations
          </button>

        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Code example */}
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>The Code</h3>
            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px" }}>
              <pre style={{ fontSize: "0.9rem", lineHeight: 1.4, margin: 0 }}>
                <code>{`// Button updates state
<button onClick={() => setTrigger(prev => prev + 1)}>
  Trigger Animations
</button>

// Components react automatically
    <motion.div
  key={trigger} // Forces re-animation
  initial={{ x: 0, rotate: 0 }}
  animate={{ 
    x: [0, -10, 10, -5, 5, 0],
    rotate: [0, -2, 2, -1, 1, 0]
  }}
  transition={{ duration: 0.6 }}
>
  I shake when triggered!
</motion.div>

<motion.div
  key={\`icon-\${trigger}\`}
  animate={{ rotate: trigger > 0 ? 360 : 0 }}
>
  ⚡ I spin!
</motion.div>`}</code>
              </pre>
            </div>
          </div>

          {/* Live demo - multiple components that react */}
          <div style={{ position: "relative" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Watch Components React</h3>

            {/* Shaking card */}
            <motion.div
              key={`card-${triggerCount}`}
              initial={{ x: 0, rotate: 0, scale: 1 }}
              animate={{
                x: triggerCount > 0 ? [0, -10, 10, -5, 5, 0] : 0,
                rotate: triggerCount > 0 ? [0, -2, 2, -1, 1, 0] : 0,
                scale: triggerCount > 0 ? [1, 1.05, 1] : 1
              }}
              transition={{ duration: 0.6 }}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                padding: "1.5rem",
                borderRadius: "12px",
                marginBottom: "2rem",
                color: "white",
                position: "relative",
                zIndex: 2
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Spinning icon */}
                <motion.div
                  key={`icon-${triggerCount}`}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: triggerCount > 0 ? 360 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ fontSize: "2rem" }}
                >
                  ⚡
                </motion.div>

                {/* Color-changing text */}
                <motion.div
                  key={`text-${triggerCount}`}
                  initial={{ color: "#ffffff" }}
                  animate={{
                    color: triggerCount > 0
                      ? ["#ffffff", "#fbbf24", "#f59e0b", "#ffffff"]
                      : "#ffffff"
                  }}
                  transition={{ duration: 1 }}
                >
                  <h4 style={{ margin: 0, fontSize: "1.3rem" }}>Reactive Component</h4>
                  <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>
                    I respond to remote triggers!
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Flying particles - positioned properly */}
            <div style={{
              position: "absolute",
              top: "60px",
              left: "0",
              right: "0",
              height: "150px",
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 1
            }}>
              {triggerCount > 0 && [...Array(5)].map((_, i) => (
                <motion.div
                  key={`particle-${triggerCount}-${i}`}
                  initial={{
                    x: 100 + i * 20,
                    y: 80,
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    x: 50 + Math.random() * 200,
                    y: 20 + Math.random() * 60,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: `hsl(${180 + i * 40}, 70%, 60%)`,
                    pointerEvents: "none"
                  }}
                />
              ))}
            </div>

            <p style={{ fontSize: "1.1rem", opacity: 0.8, fontStyle: "italic", marginTop: "1rem" }}>
              Perfect for notifications, form validation, interactive feedback!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Common Pitfalls Overview slide
function CommonPitfallsSlide() {
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 COMMON PITFALLS OVERVIEW - Setup for Deep Dives

KEY POINTS:
• This is an overview - next slides will show specific examples
• Set expectations that we'll see live demos of what NOT to do
• Build anticipation for the "gotcha" moments
• Emphasize that these are real-world mistakes

TALKING SCRIPT:
"Before we wrap up, let's talk about common pitfalls. I've seen these mistakes cost teams days of debugging and performance issues.

We're going to look at the top 3 pitfalls with live demos:
1. Performance killers - animations that destroy your frame rate
2. AnimatePresence mistakes - exit animations that never play
3. Accessibility violations - making your site unusable

Ready to see what NOT to do? Let's dive in..."

TIMING: 1-2 minutes (quick overview)
NEXT: Move to individual pitfall demo slides`;

  const pitfalls = [
    { icon: "🐌", title: "Performance Killers", summary: "Layout vs Transform properties" },
    { icon: "👻", title: "AnimatePresence Mistakes", summary: "Exit animations that never play" },
    { icon: "♿", title: "Accessibility Issues", summary: "Ignoring user motion preferences" }
  ];

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#ef4444" }}
        >
          ⚠️ Common Pitfalls
        </motion.h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3rem",
          marginBottom: "3rem"
        }}>
          {pitfalls.map((pitfall, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                borderRadius: "16px",
                padding: "2rem",
                textAlign: "center",
                border: "2px solid rgba(255,255,255,0.1)"
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                {pitfall.icon}
              </div>
              <h3 style={{ fontSize: "1.8rem", margin: "0 0 1rem 0", color: "#fff" }}>
                {pitfall.title}
              </h3>
              <p style={{ fontSize: "1.2rem", opacity: 0.8, lineHeight: 1.4, margin: 0 }}>
                {pitfall.summary}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.5rem", opacity: 0.9, marginBottom: "1rem" }}>
            Next: Live demos of each pitfall 🎬
          </p>
          <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>
            See exactly what goes wrong and how to fix it
          </p>
        </div>
      </div>
    </>
  );
}

// Performance Pitfall Demo slide
function PerformancePitfallSlide() {
  const [demoType, setDemoType] = useState<"bad" | "good">("bad");
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 PERFORMANCE PITFALL DEMO - Show the Difference

KEY POINTS:
• Start with BAD demo - let audience see the jank
• Switch to GOOD demo - show the smoothness difference
• Explain WHY this happens (layout vs transform)
• Emphasize this is the #1 performance mistake

TALKING SCRIPT:
"Here's the biggest performance killer in Motion animations.

[Show BAD demo] Watch this - animating layout properties like left, top, width. See how janky it feels? The browser has to recalculate the entire page layout on every frame.

[Trigger multiple times] Notice the stuttering? This kills performance, especially on mobile devices.

[Switch to GOOD] Now watch the same visual effect using transform properties - x, y, scale. Buttery smooth! The GPU handles these efficiently.

The visual result is identical, but the performance difference is night and day."

TIMING: 2-3 minutes
DEMO TIP: Trigger animations multiple times to show the difference!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#ef4444" }}
        >
          🐌 Performance Pitfall Demo
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Code Comparison */}
          <div>
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <button
                onClick={() => setDemoType(demoType === "bad" ? "good" : "bad")}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.3rem",
                  borderRadius: "8px",
                  border: "none",
                  background: demoType === "bad" ? "#ef4444" : "#10b981",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {demoType === "bad" ? "❌ BAD (Layout Properties)" : "✅ GOOD (Transform Properties)"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={demoType}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ background: "#1a1a1a", padding: "2rem", borderRadius: "12px" }}
              >
                <pre style={{ fontSize: "1rem", lineHeight: 1.5, margin: 0, overflow: "auto" }}>
                  <code>
                    {demoType === "bad" ? `// ❌ PERFORMANCE KILLER
<motion.div
  animate={{
    left: expanded ? 300 : 50,     // Layout!
    top: expanded ? 100 : 50,      // Layout!
    width: expanded ? 200 : 100,   // Layout!
    height: expanded ? 200 : 100   // Layout!
  }}
  transition={{ duration: 0.5 }}
>
  Janky Animation
</motion.div>

// Forces browser to:
// 1. Recalculate layout
// 2. Repaint everything
// 3. Composite layers
// Result: Stuttery, slow animation` : `// ✅ SMOOTH PERFORMANCE
<motion.div
  animate={{
    x: expanded ? 250 : 0,         // Transform!
    y: expanded ? 50 : 0,          // Transform!
    scaleX: expanded ? 2 : 1,      // Transform!
    scaleY: expanded ? 2 : 1       // Transform!
  }}
  transition={{ duration: 0.5 }}
>
  Smooth Animation
</motion.div>

// GPU accelerated:
// 1. No layout recalculation
// 2. Hardware acceleration
// 3. Composite only
// Result: Buttery smooth 60fps`}
                  </code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Demo */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Live Demo</h3>

            <button
              onClick={() => setTriggerAnimation(prev => prev + 1)}
              style={{
                padding: "1.5rem 3rem",
                fontSize: "1.4rem",
                borderRadius: "12px",
                border: "none",
                background: "#6366f1",
                color: "white",
                cursor: "pointer",
                marginBottom: "3rem",
                fontWeight: "bold"
              }}
            >
              🎬 Trigger Animation
            </button>

            <div style={{ position: "relative", height: "300px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", overflow: "hidden" }}>
              {demoType === "bad" ? (
                // BAD: Layout properties (will be janky)
                <motion.div
                  key={`bad-${triggerAnimation}`}
                  initial={{ left: 50, top: 50, width: 100, height: 100 }}
                  animate={{
                    left: [50, 250, 50],
                    top: [50, 150, 50],
                    width: [100, 150, 100],
                    height: [100, 150, 100]
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem"
                  }}
                >
                  JANKY
                </motion.div>
              ) : (
                // GOOD: Transform properties (smooth)
                <motion.div
                  key={`good-${triggerAnimation}`}
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={{
                    x: [0, 200, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    left: 50,
                    top: 50,
                    width: 100,
                    height: 100,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem"
                  }}
                >
                  SMOOTH
                </motion.div>
              )}
            </div>

            <p style={{ fontSize: "1.3rem", marginTop: "2rem", opacity: 0.9 }}>
              {demoType === "bad"
                ? "⚠️ Notice the stuttering and poor performance"
                : "✅ Buttery smooth 60fps animation"
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// AnimatePresence Pitfall Demo slide
function AnimatePresencePitfallSlide() {
  const [demoType, setDemoType] = useState<"bad" | "good">("bad");
  const [showItems, setShowItems] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 ANIMATEPRESENCE PITFALL DEMO - Exit Animation Mystery

KEY POINTS:
• Start with BAD demo - exit animations don't work
• Show the audience the frustration of broken animations
• Switch to GOOD demo - smooth exit animations
• Explain the key and structure requirements

TALKING SCRIPT:
"Here's a subtle but frustrating mistake - exit animations that never play.

[Show BAD demo] Watch when I remove items - they just disappear instantly. No exit animation, even though we defined one.

[Toggle multiple times] See? The exit animation is completely ignored. This happens when AnimatePresence structure is wrong.

[Switch to GOOD] Now watch the same code with proper structure - beautiful exit animations!

The difference? AnimatePresence must wrap the conditional, and each child needs a unique key."

TIMING: 2-3 minutes
DEMO TIP: Toggle items multiple times to show the difference clearly!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#8b5cf6" }}
        >
          👻 AnimatePresence Pitfall Demo
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Code Comparison */}
          <div>
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <button
                onClick={() => setDemoType(demoType === "bad" ? "good" : "bad")}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.3rem",
                  borderRadius: "8px",
                  border: "none",
                  background: demoType === "bad" ? "#ef4444" : "#10b981",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {demoType === "bad" ? "❌ BAD (Wrong Structure)" : "✅ GOOD (Correct Structure)"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={demoType}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ background: "#1a1a1a", padding: "2rem", borderRadius: "12px" }}
              >
                <pre style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: 0, overflow: "auto" }}>
                  <code>
                    {demoType === "bad" ? `// ❌ EXIT ANIMATIONS DON'T WORK
{showItems && (
  <AnimatePresence>
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      Item 1
    </motion.div>
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      Item 2
    </motion.div>
  </AnimatePresence>
)}

// Problems:
// 1. AnimatePresence inside conditional
// 2. No unique keys
// 3. Exit animations never play` : `// ✅ EXIT ANIMATIONS WORK PERFECTLY
<AnimatePresence>
  {showItems && [
    <motion.div
      key="item-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      Item 1
    </motion.div>,
    <motion.div
      key="item-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      Item 2
    </motion.div>
  ]}
</AnimatePresence>

// Fixed:
// 1. AnimatePresence wraps conditional
// 2. Unique keys for each item
// 3. Beautiful exit animations!`}
                  </code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Demo */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Live Demo</h3>

            <button
              onClick={() => setShowItems(!showItems)}
              style={{
                padding: "1.5rem 3rem",
                fontSize: "1.4rem",
                borderRadius: "12px",
                border: "none",
                background: "#6366f1",
                color: "white",
                cursor: "pointer",
                marginBottom: "3rem",
                fontWeight: "bold"
              }}
            >
              {showItems ? "🗑️ Remove Items" : "✨ Add Items"}
            </button>

            <div style={{ minHeight: "200px", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
              {demoType === "bad" ? (
                // BAD: Wrong AnimatePresence structure
                showItems && (
                  <AnimatePresence>
                    <motion.div
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        padding: "1rem 2rem",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold"
                      }}
                    >
                      Item 1 (No Exit Animation!)
                    </motion.div>
                    <motion.div
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        padding: "1rem 2rem",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold"
                      }}
                    >
                      Item 2 (No Exit Animation!)
                    </motion.div>
                  </AnimatePresence>
                )
              ) : (
                // GOOD: Correct AnimatePresence structure
                <AnimatePresence>
                  {showItems && [
                    <motion.div
                      key="item-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        padding: "1rem 2rem",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold"
                      }}
                    >
                      Item 1 (Smooth Exit!)
                    </motion.div>,
                    <motion.div
                      key="item-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{
                        padding: "1rem 2rem",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold"
                      }}
                    >
                      Item 2 (Smooth Exit!)
                    </motion.div>
                  ]}
                </AnimatePresence>
              )}
            </div>

            <p style={{ fontSize: "1.3rem", marginTop: "2rem", opacity: 0.9 }}>
              {demoType === "bad"
                ? "⚠️ Items disappear instantly - no exit animation"
                : "✅ Beautiful exit animations with proper structure"
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Key Tips slide - Essential Motion concepts
function KeyTipsSlide() {
  // Separate states for each demo
  const [demoKey, setDemoKey] = useState(0);
  const [showWithKey, setShowWithKey] = useState(true); // Controls "With Key" / "Without Key" for first demo
  const [showCorrectStructure, setShowCorrectStructure] = useState(true); // Controls structure for second demo  
  const [showItems, setShowItems] = useState(true); // Controls visibility of items for AnimatePresence demo
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 KEY TIPS SLIDE - Essential Motion Rules

KEY POINTS:
• These are the two most common beginner mistakes
• Keys are crucial for Motion to track components
• Conditional rendering structure matters for exit animations
• Show both problems and solutions with live demos

TALKING SCRIPT:
"Before we wrap up, here are the two most important things to remember:

[Demo 1] First - always use keys when you want to re-trigger animations. Watch what happens without a key vs with a key.

[Demo 2] Second - exit animations only work with proper structure. AnimatePresence must wrap the conditional, not be inside it.

These two tips will save you hours of debugging. Remember: keys for animations, proper structure for exits."

TIMING: 3-4 minutes
DEMO TIP: Show both demos multiple times to make the concepts stick!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "2rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "4rem", textAlign: "center", marginBottom: "3rem", color: "#f59e0b" }}
        >
          🔑 Key Motion Tips
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

          {/* Tip 1: Keys for animations */}
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#10b981" }}>
              1️⃣ Use Keys to Re-trigger Animations
            </h2>

            <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setShowWithKey(!showWithKey)}
                style={{
                  padding: "0.7rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "none",
                  background: showWithKey ? "#10b981" : "#ef4444",
                  color: "white",
                  cursor: "pointer",
                  minWidth: "140px"
                }}
              >
                {showWithKey ? "✅ With Key" : "❌ Without Key"}
              </button>

              <button
                onClick={() => setDemoKey(prev => prev + 1)}
                style={{
                  padding: "0.7rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#6366f1",
                  color: "white",
                  cursor: "pointer",
                  minWidth: "160px"
                }}
              >
                🎬 Trigger Animation
              </button>
            </div>

            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
              <pre style={{ fontSize: "0.9rem", lineHeight: 1.4, margin: 0 }}>
                <code>
                  {showWithKey ? `// ✅ WITH KEY - Animation re-triggers
<motion.div
  key={counter}  // Key changes = new animation
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
>
  Click count: {counter}
</motion.div>` : `// ❌ WITHOUT KEY - Animation only runs once
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
>
  Click count: {counter}
</motion.div>`}
                </code>
              </pre>
            </div>

            <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {showWithKey ? (
                <motion.div
                  key={demoKey}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    padding: "1rem 2rem",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "bold"
                  }}
                >
                  Count: {demoKey} ✨
                </motion.div>
              ) : (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    padding: "1rem 2rem",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "bold"
                  }}
                >
                  Count: {demoKey} (No Animation)
                </motion.div>
              )}
            </div>
          </div>

          {/* Tip 2: AnimatePresence structure */}
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#8b5cf6" }}>
              2️⃣ AnimatePresence Structure Matters
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <button
                onClick={() => setShowCorrectStructure(!showCorrectStructure)}
                style={{
                  padding: "0.7rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "none",
                  background: showCorrectStructure ? "#10b981" : "#ef4444",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "1rem"
                }}
              >
                {showCorrectStructure ? "✅ Correct Structure" : "❌ Wrong Structure"}
              </button>

              <button
                onClick={() => setShowItems(!showItems)}
                style={{
                  padding: "0.7rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#6366f1",
                  color: "white",
                  cursor: "pointer",
                  marginLeft: "1rem"
                }}
              >
                {showItems ? "🗑️ Remove Item" : "✨ Add Item"}
              </button>
            </div>

            <div style={{ background: "#1a1a1a", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
              <pre style={{ fontSize: "0.9rem", lineHeight: 1.4, margin: 0 }}>
                <code>
                  {showCorrectStructure ? `// ✅ CORRECT - AnimatePresence wraps conditional
<AnimatePresence>
  {show && (
    <motion.div 
      key="item"
      exit={{ opacity: 0 }}
    >
      Item with smooth exit!
    </motion.div>
  )}
</AnimatePresence>` : `// ❌ WRONG - AnimatePresence inside conditional
{show && (
  <AnimatePresence>
    <motion.div exit={{ opacity: 0 }}>
      Item (exit animation won't work!)
    </motion.div>
  </AnimatePresence>
)}`}
                </code>
              </pre>
            </div>

            <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {showCorrectStructure ? (
                // CORRECT: AnimatePresence wraps conditional
                <AnimatePresence>
                  {showItems && (
                    <motion.div
                      key="demo-item-correct"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: "1rem 2rem",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold"
                      }}
                    >
                      Smooth exit! ✨
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                // WRONG: AnimatePresence inside conditional (no exit animation)
                showItems && (
                  <AnimatePresence>
                    <motion.div
                      key="demo-item-wrong"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: "1rem 2rem",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold"
                      }}
                    >
                      No exit animation! 💥
                    </motion.div>
                  </AnimatePresence>
                )
              )}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ fontSize: "1.5rem", opacity: 0.9 }}>
            💡 <strong>Remember:</strong> Keys for re-triggering, proper structure for exits!
          </p>
        </div>
      </div>
    </>
  );
}

// Thanks & Q&A slide - Final slide
function ThanksSlide() {
  const [showNotes, setShowNotes] = useState(false);

  const presenterNotes = `🎯 THANKS & MEETUP CHAT - Wrap Up & Network

KEY POINTS:
• Thank everyone for coming to the meetup
• Create a casual, interactive atmosphere
• Encourage networking and collaboration
• Be approachable for one-on-one conversations

TALKING SCRIPT:
"That's a wrap on our Motion journey! We covered the essentials:
- Why Motion beats plain CSS for complex animations
- Developer experience improvements
- Enter/exit animations with AnimatePresence
- Layout animations with the magic 'layout' prop
- Built-in gestures and accessibility
- Key tips to avoid common pitfalls

Motion makes animations approachable and performant. Start small, experiment, and build up complexity gradually.

Now let's grab some food and drinks! I'd love to hear about your projects and animation ideas. Don't be shy - come chat with me or others here tonight!"

TIMING: Open-ended networking time
MEETUP TIP: Move around, be social, and encourage people to connect with each other!`;

  return (
    <>
      <PresenterNotes
        notes={presenterNotes}
        isVisible={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
      />
      <div style={{
        maxWidth: "90%",
        margin: "0 auto",
        padding: "4rem 2rem",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ marginBottom: "4rem" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "5rem",
              marginBottom: "2rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem"
            }}
          >
            <span style={{ fontSize: "5rem" }}>🙏</span>
            <span style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>
              Thanks for Your Attention!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "2rem",
              marginBottom: "3rem",
              opacity: 0.9
            }}
          >
            Hope you're excited to start animating with Motion! ✨
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}

export default function Slides() {
  const slides: ReactNode[] = [
    <TitleSlide key="title" />,
    <WhyMotionSlide key="why" />,
    <BetterDXSlide key="dx" />,
    <EnterExitSlide key="enter-exit" />,
    <LayoutMagicSlide key="layout" />,
    <GesturesSlide key="gestures" />,
    <AccessibilitySlide key="accessibility" />,
    <KeyTipsSlide key="key-tips" />,
    <ThanksSlide key="thanks" />,
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);

  const go = useCallback(
    (dir: Direction) => {
      setDirection(dir);
      setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + dir)));
    },
    [slides.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") go(1);
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") go(-1);
      // Add scroll shortcuts
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        window.scrollBy({ top: -300, behavior: "smooth" });
      }
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        window.scrollBy({ top: 300, behavior: "smooth" });
      }
      // Home/End for quick navigation
      if (e.key === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (e.key === "End") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const progress = (index / (slides.length - 1 || 1)) * 100;

  return (
    <div style={{ background: "#0b1020", color: "white", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        <SlideContainer key={index} direction={direction}>
          <div style={{ maxWidth: 960 }}>{slides[index]}</div>
        </SlideContainer>
      </AnimatePresence>

      <div style={{ position: "fixed", bottom: 56, left: 12, display: "flex", gap: 8 }} aria-hidden>
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous slide"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "inherit",
            cursor: index === 0 ? "not-allowed" : "pointer",
            opacity: index === 0 ? 0.5 : 1,
          }}
        >
          Prev
        </button>
        <button
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "inherit",
            cursor: index === slides.length - 1 ? "not-allowed" : "pointer",
            opacity: index === slides.length - 1 ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 12,
          left: 12,
          right: 12,
          height: 4,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 4,
        }}
        aria-hidden
      >
        <motion.div
          style={{ height: "100%", background: "#6366f1", borderRadius: 4 }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div style={{ position: "fixed", top: 12, right: 16, opacity: 0.6, fontSize: 14 }} aria-hidden>
        {index + 1} / {slides.length}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "fixed",
        top: "50%",
        right: 16,
        transform: "translateY(-50%)",
        opacity: 0.4,
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <div style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          ↑ W/↑ Scroll Up
        </div>
        <div style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          ↓ S/↓ Scroll Down
        </div>
      </div>
    </div>
  );
}

