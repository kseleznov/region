"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation, type TranslationKey } from "@/shared/i18n";
import { RankGlyph } from "./RankGlyph";
import { getRankProgress } from "../model/getRankProgress";

export type RankProgressVariant = "visit" | "rankUp";

/** How long each variant stays up before dismissing itself, in ms. */
const DISMISS_MS: Record<RankProgressVariant, number> = {
  visit: 4200,
  rankUp: 5600,
};

const PARTICLE_COUNT = 30;
const BAR_EASE = [0.16, 1, 0.3, 1] as const;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: number;
  delay: number;
  duration: number;
}

function buildParticles(color: string): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => {
    const angle = (id / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 120 + Math.random() * 190;
    return {
      id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 4 + Math.random() * 8,
      color: id % 3 === 0 ? "#ffffff" : color,
      rotate: (Math.random() - 0.5) * 360,
      delay: Math.random() * 0.12,
      duration: 0.9 + Math.random() * 0.7,
    };
  });
}

interface ProgressBarProps {
  color: string;
  fromPercent: number;
  toPercent: number;
  animate: boolean;
  delay: number;
}

function ProgressBar({
  color,
  fromPercent,
  toPercent,
  animate,
  delay,
}: ProgressBarProps) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px ${color}aa` }}
        initial={{ width: `${fromPercent}%` }}
        animate={{ width: `${toPercent}%` }}
        transition={
          animate ? { duration: 0.9, ease: BAR_EASE, delay } : { duration: 0 }
        }
      />
    </div>
  );
}

interface RankProgressProps {
  variant: RankProgressVariant;
  placesVisited: number;
  onDismiss: () => void;
}

/**
 * Post-visit feedback. Every "mark visited" shows the `visit` card: the current
 * rank glyph and a bar filling toward the next rank. When that visit crossed a
 * rank boundary it upgrades to the full-screen `rankUp` celebration — particle
 * burst, shockwave, the new rank's name. Both honour `prefers-reduced-motion`.
 */
export function RankProgress({
  variant,
  placesVisited,
  onDismiss,
}: RankProgressProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isRankUp = variant === "rankUp";

  const current = getRankProgress(placesVisited);
  const previous = getRankProgress(Math.max(0, placesVisited - 1));
  const rank = current.currentRank;

  // Randomised once so the particles don't re-scatter on every render.
  const [particles] = useState(() =>
    isRankUp ? buildParticles(rank.color) : [],
  );

  useEffect(() => {
    navigator.vibrate?.(isRankUp ? [0, 45, 40, 90] : 16);

    const timer = window.setTimeout(onDismiss, DISMISS_MS[variant]);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant, isRankUp, onDismiss]);

  const rankName = t(`ranks.${rank.key}` as TranslationKey);
  const animateBar = !prefersReducedMotion;
  const fromPercent = isRankUp ? 0 : previous.progressPercent;
  const barMin = rank.min;
  const barMax = current.nextRank ? current.nextRank.min : rank.min;

  const caption = current.nextRank ? (
    <>
      {t("ranks.moreToNext", { count: current.placesToNextRank })}{" "}
      <span className="font-bold" style={{ color: current.nextRank.color }}>
        {t(`ranks.${current.nextRank.key}` as TranslationKey)}
      </span>
    </>
  ) : (
    <span className="font-bold">{t("ranks.reachedTop")}</span>
  );

  if (isRankUp) {
    return (
      <motion.div
        role="alertdialog"
        aria-label={t("ranks.rankUpAria", { name: rankName })}
        onClick={onDismiss}
        className="fixed inset-0 z-[300] flex cursor-pointer items-center justify-center overflow-hidden px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        <div className="absolute inset-0 bg-[#07070a]/95 backdrop-blur-xl" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${rank.color}33, transparent 62%)`,
          }}
        />

        {!prefersReducedMotion && (
          <motion.div
            className="absolute h-56 w-56 rounded-full border"
            style={{ borderColor: `${rank.color}55` }}
            initial={{ scale: 0.2, opacity: 0.7 }}
            animate={{ scale: 4.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        )}

        {!prefersReducedMotion &&
          particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: particle.x,
                y: particle.y,
                rotate: particle.rotate,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 0.9, 0.35],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: BAR_EASE,
              }}
            />
          ))}

        <div className="relative flex w-full max-w-xs flex-col items-center text-center">
          <div className="relative mb-7 h-40 w-40">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: rank.color, filter: "blur(38px)" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.32, scale: 1 }
                  : { opacity: [0, 0.55, 0.32], scale: [0.6, 1.15, 0.95] }
              }
              transition={{ duration: 1.4, ease: "easeOut" }}
            />

            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full -rotate-90"
              style={{ overflow: "visible" }}
            >
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={rank.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${rank.color})` }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.9,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              />
            </svg>

            <motion.div
              className="absolute inset-[18px] flex items-center justify-center"
              initial={{
                scale: 0,
                rotate: prefersReducedMotion ? 0 : -35,
                opacity: 0,
              }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { type: "spring", stiffness: 240, damping: 15, delay: 0.18 }
              }
            >
              <RankGlyph rank={rank} size="lg" />
            </motion.div>
          </div>

          <motion.p
            className="mb-2 text-[11px] font-black uppercase tracking-[0.32em] text-white/60"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("ranks.levelUp")}
          </motion.p>

          <motion.h2
            className="text-[2.6rem] font-black leading-none"
            style={{
              color: rank.color,
              textShadow: `0 0 24px ${rank.color}80`,
            }}
            initial={{ y: 22, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? { delay: 0.15 }
                : { type: "spring", stiffness: 300, damping: 18, delay: 0.36 }
            }
          >
            {rankName}
          </motion.h2>

          <motion.p
            className="mt-2 mb-6 text-sm lowercase tracking-wide text-white/50"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.46 }}
          >
            {t(`ranks.taglines.${rank.key}` as TranslationKey)}
          </motion.p>

          <motion.div
            className="w-full"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.56 }}
          >
            <ProgressBar
              color={rank.color}
              fromPercent={fromPercent}
              toPercent={current.progressPercent}
              animate={animateBar}
              delay={0.7}
            />
            <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-white/40">
              <span>{barMin}</span>
              <span>{barMax}</span>
            </div>
            <p className="mt-3 text-xs text-white/70">{caption}</p>
          </motion.div>

          <motion.p
            className="mt-8 text-[11px] tracking-wide text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {t("ranks.dismissHint")}
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      role="status"
      aria-label={t("ranks.progressAria")}
      onClick={onDismiss}
      className="fixed inset-0 z-[300] flex cursor-pointer items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />

      <motion.div
        className="relative w-full max-w-xs rounded-3xl border border-white/10 bg-[#0b0b0f]/95 p-6 text-center"
        style={{
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${rank.color}22`,
        }}
        initial={{ y: 26, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 12, scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <motion.div
          className="mx-auto mb-3 h-16 w-16"
          initial={{ scale: prefersReducedMotion ? 1 : 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { type: "spring", stiffness: 260, damping: 16 }
          }
        >
          <RankGlyph rank={rank} size="lg" />
        </motion.div>

        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/45">
          {t("ranks.placeAdded")}
        </p>
        <h3 className="mb-4 text-lg font-black" style={{ color: rank.color }}>
          {rankName}
        </h3>

        <ProgressBar
          color={rank.color}
          fromPercent={fromPercent}
          toPercent={current.progressPercent}
          animate={animateBar}
          delay={0.2}
        />
        <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-white/35">
          <span>{barMin}</span>
          <span>{barMax}</span>
        </div>

        <p className="mt-3 text-xs text-white/60">{caption}</p>
      </motion.div>
    </motion.div>
  );
}
