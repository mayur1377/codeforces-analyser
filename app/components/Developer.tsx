import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGithub } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { RiInfoCardLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export function Developer () {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <RiInfoCardLine className="text-black dark:text-white cursor-pointer" style={{ marginRight: '13px' }} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hey there , I&apos;m Mayur! &nbsp;
          <div className="wave-animation text-l">
            👋
          </div>
          </DialogTitle>
          <DialogDescription>
            I made this cool little website over the weekend , thanks for checking it out!
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center space-x-4">
          <a href="https://github.com/mayur1377" target="_blank" rel="noopener noreferrer" className="text-2xl">
            <FaGithub />
          </a>
          <HoverCard>
            <HoverCardTrigger asChild>
              <a href="https://www.buymeacoffee.com/mayur1377" target="_blank" rel="noopener noreferrer" className="text-2xl">
                <CiCoffeeCup />
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              since onlyfans is not working out for me.
            </HoverCardContent>
          </HoverCard>
        </div>



        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          {/* <IoMdClose className="cursor-pointer" /> */}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
