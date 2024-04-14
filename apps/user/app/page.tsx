import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";
import {Show} from '@repo/ui/Show'
import {PrismaClient} from '@repo/prisma/client'

const client = PrismaClient()


export default function Page(): JSX.Element {
  return (
   <div className="text-2xl">
    heyy km
    <Show/>
   </div>
  );
}
