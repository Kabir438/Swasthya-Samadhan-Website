"use client";
import { CardBody, CardContainer, CardItem } from "@/components/3d-card";
import { PinContainer } from "@/components/3d-pin";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { TextRevealCard } from "@/components/text-reveal";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    // <SmoothScroll>
    <>
      <Header />
      <main>
        <TextRevealCard
          text={`Meet the Team`}
          revealText="We want some credit"
        ></TextRevealCard>
        <div className="flex items-center justify-between gap-7 pb-44 px-10">
          {members.map((member) => (
            <PinContainer key={member.name} title="kabir-chawla.com" href={"https://kabir-chawla.com"} enabled={!!member.link}>
              <CardContainer className={cn("w-[22rem]", member.link ? "hover:grayscale-[1] relative -top-[15px] group-[.active]/card:cursor-pointer group-[.active]/card:grayscale-[1]" : "")}>
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem translateZ="100" className="w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={member.alt}
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-xl capitalize font-bold mt-4 text-neutral-600 dark:text-white"
                  >
                    {member.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {member.title}
                  </CardItem>
                  {member.link && (
                    <div className="flex md:hidden justify-between items-center mt-4">
                      <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 w-full py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      >
                        Visit Portfolio
                      </CardItem>
                    </div>
                  )}
                </CardBody>
              </CardContainer>
            </PinContainer>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

const members = [
  {
    name: "Zubin Dhar",
    title: "Chief Marketing Officer",
    image: "/people/kabir.png",
    alt: "Zubin's Profile",
  },
  {
    name: "Kabir Chawla",
    title: "Founder and CEO",
    image: "/people/kabir.png",
    alt: "Kabir's Profile",
    link: "https://kabir-chawla.com" as string | undefined,
    scale: true
  },
  {
    name: "Nanda Karumudi",
    title: "Chief Information Officer",
    image: "/people/nanda.png",
    alt: "Nanda's Profile",
  },
];
