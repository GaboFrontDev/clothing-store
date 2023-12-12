"use client";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";
import {
  useCallback,
  useRef,
  useState,
} from "react";
import Buttons from "./Buttons";
import { ArrowLeft, ArrowRight } from "./Icon";
import { PhotoVisualize } from "./PhotoVisualize";

interface CarouselProps {
  images: StrapiMediaEntity[];
}

export default function Carousel(
  props: CarouselProps
) {
  const { images } = props;

  const containerRef =
    useRef() as React.MutableRefObject<HTMLElement>;
  const [currentStep, setCurrentStep] =
    useState(0);

  const scrollToOffset = (index: number) => {
    const photoContainerWidth =
      window.document.getElementById("photo-1")
        ?.offsetWidth || 0;
    containerRef.current.scrollLeft =
      (photoContainerWidth + 10) * index -
      0.03 * photoContainerWidth;
    setCurrentStep(index);
  };

  const scrollToLeft = useCallback(
    (event?: MouseEvent) => {
      if (event) {
        event.stopPropagation();
      }

      if (currentStep - 1 < 0) {
        scrollToOffset(images.length - 1);
        return;
      }
      scrollToOffset(currentStep - 1);
    },
    [currentStep, images.length]
  );

  const scrollToRight = useCallback(
    (event?: MouseEvent) => {
      if (event) {
        event.stopPropagation();
      }
      if (currentStep + 1 > images.length - 1) {
        scrollToOffset(0);
        return;
      }
      scrollToOffset(currentStep + 1);
    },
    [currentStep, images.length]
  );

  return (
    <section>
      <section
        id="image-container"
        className="max-w-[95vw] md:max-w-[550px] overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
        ref={containerRef}
      >
        {images.map((image, index) => (
          <div
            key={`photo-${index}`}
            id={`photo-${index}`}
            className="rounded-md overflow-hidden ml-[10px] inline-block w-[85vw] md:w-11/12"
          >
            <PhotoVisualize
              data={image}
              size="small"
            />
          </div>
        ))}
      </section>
      <section
        id="scroll-controls"
        className="w-full flex justify-center items-center"
      >
        <Buttons.Button
          onClick={(event) =>
            scrollToLeft(event as any)
          }
          className="bg-transparent"
        >
          <ArrowLeft />
        </Buttons.Button>
        {currentStep + 1}/{images.length}
        <Buttons.Button
          onClick={(event) =>
            scrollToRight(event as any)
          }
          className="bg-transparent"
        >
          <ArrowRight />
        </Buttons.Button>
      </section>
    </section>
  );
}
