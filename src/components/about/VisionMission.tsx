import { Fragment } from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { ABOUT_BLOCKS, type AboutBlock } from "@/data/about";

function Block({ block }: { block: AboutBlock }) {
  return (
    <div data-qa={`about-${block.id}`} className="flex w-full flex-col items-start gap-8 py-6 pl-2 lg:min-w-0 lg:flex-1 lg:gap-10 lg:py-12 lg:pl-12">
      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="font-display text-[32px] leading-[1.2] text-neutral-900 lg:text-[56px] lg:leading-[1.4]">{block.title}</h2>
        <p className="text-[16px] leading-[1.4] text-neutral-400 lg:w-[373px] lg:text-[20px] lg:tracking-[-0.2px]">{block.lead}</p>
      </div>
      <ul className="flex w-full flex-col items-start gap-6 lg:w-[504px] lg:gap-0">
        {block.points.map((p) => (
          <li key={p.title} className="flex w-full items-start gap-5 lg:p-5">
            <span aria-hidden className="flex h-[19px] w-[19.152px] shrink-0 items-center justify-center text-primary-500 lg:h-[31px]">
              <IconCircleCheckFilled size={23} className="shrink-0" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <h3 className="text-[16px] leading-[1.2] font-medium text-neutral-900 lg:text-[24px] lg:leading-[29px]">{p.title}</h3>
              <p className="text-[14px] leading-[1.2] text-neutral-400 lg:text-[16px] lg:leading-[22px]">{p.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Figma "Vision & Mission" — desktop 139:10579 (1440×822), mobile 139:10578 (375×947). */
export function VisionMission() {
  return (
    <section
      data-qa="about-vm"
      className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-5 overflow-hidden bg-neutral-50 px-2 py-3 lg:flex-row lg:gap-10 lg:p-3"
    >
      {ABOUT_BLOCKS.map((b, i) => (
        <Fragment key={b.id}>
          {i > 0 && (
            <div aria-hidden className="flex h-1 w-full shrink-0 items-center lg:h-auto lg:w-1 lg:self-stretch lg:justify-center">
              <span className="h-px w-full bg-neutral-300 lg:h-[582px] lg:w-px" />
            </div>
          )}
          <Block block={b} />
        </Fragment>
      ))}
    </section>
  );
}
