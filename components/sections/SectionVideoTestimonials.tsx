'use client';

import React from 'react';
import VideoTestimonialsSlider, {
  VideoTestimonialsSliderProps,
  VideoTestimonialItem,
} from '../VideoTestimonialsSlider';

export type SectionVideoTestimonialsProps = Omit<VideoTestimonialsSliderProps, 'items'> & {
  items?: VideoTestimonialItem[];
};

export default function SectionVideoTestimonials(props: SectionVideoTestimonialsProps) {
  return <VideoTestimonialsSlider {...props} />;
}
