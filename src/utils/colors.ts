import { SPINE_COLORS } from './constants';

export function getRandomSpineColor(): string {
  return SPINE_COLORS[Math.floor(Math.random() * SPINE_COLORS.length)];
}
