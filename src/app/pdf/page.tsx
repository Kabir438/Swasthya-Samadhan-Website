"use client";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function PDF() {
  const [promoterName, setPromoterName] = useState("");
  return (
    <main className={cn("flex gap-8 place-items-center w-screen h-screen flex-col items-center justify-center")}>
      <Image
        src={"/logo.png"}
        alt={"Logo"}
        width={1912 / 5.5}
        height={278 / 5.5}
      />
      <form
        action=""
        className="md:w-[30rem] flex flex-col items-center justify-start gap-5 border-gray-500 border-[1px] rounded-lg max-w-sm py-10 px-10"
      >
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Generate Poster
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className="mb-1">
            Promoter Name
          </Label>
          <Input
            type="text"
            placeholder="Promoter Name"
            value={promoterName}
            color="#ff6060"
            onChange={(e) =>
              setPromoterName(
                e.target.value
                  .replaceAll(" ", "")
                  .replaceAll("-", "_")
                  .toLowerCase()
              )
            }
            className={cn(
              "w-full focus-within:border-[#ff6060] ring-offset-[#ff6060] focus-visible:ring-[#ff6060]"
            )}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className="mb-1">
            Language
          </Label>
          <Select>
            <SelectTrigger
              color="#ff6060"
              className="w-full focus-within:border-[#ff6060] ring-offset-[#ff6060] !ring-[#ff6060]"
            >
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem color="#ff6060" key={1} value="english">
                <div className="flex flex-row items-center justify-start gap-2 flex-nowrap">
                  <Icon
                    width={22}
                    height={22}
                    icon="twemoji:flag-united-kingdom"
                  />
                  English
                </div>
              </SelectItem>
              <SelectItem color="#ff6060" key={2} value="hindi">
                <div className="flex flex-row items-center justify-start gap-2 flex-nowrap">
                  <Icon width={22} height={22} icon="twemoji:flag-india" />
                  Hindi
                </div>
              </SelectItem>
              <SelectItem color="#ff6060" key={3} value="punjabi">
                <div className="flex flex-row items-center justify-start gap-2 flex-nowrap">
                  <Image
                    src="/punjabi.png"
                    width={20}
                    height={20}
                    className="scale-x-110"
                    alt="punjabi"
                  />
                  Punjabi
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-full max-w-sm bg-[#ff6060] hover:bg-[hsl(0,34%,46%)]"
          color="#ff6060"
        >
          Generate
        </Button>
      </form>
    </main>
  );
}
