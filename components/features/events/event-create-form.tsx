"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const eventSchema = z.object({
  title: z.string().min(2, "2자 이상 입력하세요"),
  location: z.string().min(2, "2자 이상 입력하세요"),
  eventDate: z.string().min(1, "날짜를 선택하세요"),
  description: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

export function EventCreateForm() {
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      location: "",
      eventDate: "",
      description: "",
    },
  });

  const onSubmit = (_values: EventFormValues) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    toast.success("이벤트가 생성되었습니다");
    router.push("/events");
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-md hover:bg-accent transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">새 이벤트 만들기</h1>
      </div>

      <div className="flex-1 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이벤트 제목 *</FormLabel>
                  <FormControl>
                    <Input placeholder="이벤트 제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>장소 *</FormLabel>
                  <FormControl>
                    <Input placeholder="이벤트 장소를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>날짜 및 시간 *</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input placeholder="이벤트 설명을 입력하세요 (선택)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              이벤트 만들기
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
