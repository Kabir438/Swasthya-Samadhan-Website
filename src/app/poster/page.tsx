"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  language: z.enum(["english", "hindi", "punjabi"], {
    required_error: "Please select a language for the poster.",
  }),
  promoter: z
    .string({
      required_error: "Please select a promoter for the poster.",
    })
    .min(3, "Please enter a promoter's name with a minimum of 3 characters."),
});

const makePoster = (data: z.infer<typeof formSchema>, download?: boolean) => {
  return (
    `${process.env.NEXT_PUBLIC_POSTER_LINK}/?language=${data.language}&promoter=${data.promoter}` +
    (download ? "&download=true" : "")
  );
};

export default function MakePoster() {
  const [open, setOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    setOpen(true);
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    toast.toast({
      title: "Link Copied!",
    });
  }

  const n = typeof window !== 'undefined' ? window.navigator : {
    canShare: () => true,
    share: () => {},
  } as {
    canShare: () => boolean,
    share?: () => void
  };

  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center gap-2 w-screen h-screen"
      )}
    >
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] gap-0">
          <DialogHeader>
            <DialogTitle className="text-4xl text-center">
              Get Poster
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              type="button"
              style={{
                backgroundColor: "#ff7d7d",
                color: "black",
              }}
              onClick={() => {
                window.open(makePoster(form.getValues()), "_blank");
              }}
            >
              View Poster
            </Button>
            <Button
              type="button"
              style={{
                backgroundColor: "#4583ff",
              }}
              onClick={() => {
                window.open(makePoster(form.getValues(), true), "_blank");
              }}
            >
              Download Poster
            </Button>
            {n?.share && n?.canShare() && (
              <Button
                type="button"
                style={{
                  backgroundColor: "#4583ff",
                }}
                onClick={async () => {
                  setShareLoading(true)
                  console.log(makePoster(form.getValues()));
                  const response = await fetch(makePoster(form.getValues()));
                  const buffer = await response.arrayBuffer();

                  const { promoter, language } = form.getValues();
                  const fileName = `${promoter
                    .charAt(0)
                    .toUpperCase()}${promoter.substring(1)}'s ${language
                    .charAt(0)
                    .toUpperCase()}${language.substring(1)} Poster`;

                  const pdf = new File([buffer], fileName, {
                    type: "application/pdf",
                  });
                  const files = [pdf];

                  // Share PDF file if supported.
                  if (navigator.canShare({ files }))
                    await navigator.share({ files });
                }}
                className="flex items-center justify-center gap-2"
              >
                Share Poster
                {
                  shareLoading && <Icon icon='line-md:loading-twotone-loop' width={30}/>
                }
              </Button>
            )}
            <div className="overflow-hidden border-gray-700 relative border-[1px] h-10 rounded-[calc(var(--radius)-2px)]">
              <div className="h-full w-[calc(100%-48px)] absolute top-0 left-[4px] overflow-hidden">
                <span className="h-full flex items-center whitespace-nowrap">
                  {makePoster(form.getValues())
                    .replace("https://", "")
                    .replace("http://", "")}
                </span>
              </div>
              <button
                onClick={() => copyText(makePoster(form.getValues()))}
                className="bg-transparent absolute top-0 right-0 grid place-items-center h-full aspect-square"
              >
                <Icon icon="uiw:copy" color="white" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Image
        src={"/logo.png"}
        alt={"Logo"}
        width={1912 / 5.5}
        height={278 / 5.5}
      />
      <Card
        form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[90vw] w-[32rem] flex flex-col items-center px-4 py-1 pb-4"
      >
        <CardHeader className="p-0 pb-2 sm:p-3 items-center">
          <h1 className="scroll-m-20 text-center text-3xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
            Create a Poster
          </h1>
        </CardHeader>
        <Form {...form}>
          <CardContent className="flex flex-col items-center w-full justify-center gap-5 p-0 mt-3">
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="promoter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promoter</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="promoter"
                        placeholder="Promoter"
                        className="mt-1"
                        {...field}
                        onChange={(event) =>
                          field.onChange({
                            ...event,
                            target: {
                              ...event.target,
                              value: event.target.value
                                .replaceAll(" ", "_")
                                .replaceAll("-", "_")
                                .toLowerCase(),
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promoter</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">
                          <div className="flex items-center justify-start">
                            <Icon
                              icon="twemoji:flag-united-kingdom"
                              width={22}
                              className="mr-1"
                            />
                            English
                          </div>
                        </SelectItem>
                        <SelectItem value="hindi">
                          <div className="flex items-center justify-start">
                            <Icon
                              icon="twemoji:flag-india"
                              width={22}
                              className="mr-1"
                            />
                            Hindi
                          </div>
                        </SelectItem>
                        <SelectItem value="punjabi">
                          <div className="flex items-center justify-start">
                            <Image
                              width={20}
                              height={20}
                              src="/punjabi.png"
                              alt={"punjabi icon"}
                              style={{
                                transform: "scaleX(1.1)",
                              }}
                              className="mr-1"
                            />
                            Punjabi
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full">Create Poster</Button>
          </CardContent>
        </Form>
      </Card>
    </main>
  );
}
