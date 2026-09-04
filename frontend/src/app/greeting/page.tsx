import { GreetingWindow } from "@/widgets/greeting-window";

export default function Greeting() {
  return (
    <div className="fixed inset-0 mx-auto flex max-w-[500px] flex-col overflow-hidden px-[16px] py-[24px]">
      <GreetingWindow />
    </div>
  );
}
