"use client";

import { Container } from "@mantine/core";
import Image from "next/image";

export default function AboutMe() {
  return (
    <div>
      <Container
        size="lg"
        className="flex flex-col lg:flex-row items-center justify-center gap-16"
      >
        <div className="relative w-[90%] md:w-[70%] lg:w-[420px] aspect-square">
          <div
            className={`
            absolute
            top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2 rotate-[10deg]
            w-[90%] lg:w-[380px]
            aspect-square
            bg-blue-500 rounded-xl
            z-0
          `}
          />
          <div
            className={`
              absolute
              top-1/2 left-1/2
              transform -translate-x-1/2 -translate-y-1/2
              w-[90%] aspect-square
              rounded-xl overflow-hidden
              z-10
            `}
          >
            <Image
              src="/profile.jpg"
              alt="Profile"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="w-[90%] md:w-[70%] lg:w-[420px]">
          {" "}
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Riku Kobayashi
            </h2>

            <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
              Hi, I&apos;m a student at the University of Tokyo majoring in{" "}
              <strong>Electrical Engineering</strong>. I&apos;m especially
              interested in technologies such as circuit design, wireless
              technology, and machine learning, and I&apos;ve been conducting
              research related to wireless power transfer.{" "}
              <a
                href="https://arxiv.org/abs/2503.02183"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#228be6", textDecoration: "underline" }}
              >
                My first paper
              </a>{" "}
              has been accepted to IEEE WPTCE 2025.
              <br />
              <br />I also have experience developing web applications,
              including backend APIs using Go, as well as frontend development
              with React and GraphQL.{" "}
              <a
                href="https://starbucks-git-update-20240314-riku0413s-projects.vercel.app?_vercel_share=T9p0CX1kX3uuObZsGJjV7CwDSyHl6T9V"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#228be6", textDecoration: "underline" }}
              >
                This
              </a>{" "}
              is the first web cite I developed.
              <br />
              <br />
              I&apos;m currently preparing to study abroad at ETH Zurich in
              Switzerland this September through an exchange program.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
