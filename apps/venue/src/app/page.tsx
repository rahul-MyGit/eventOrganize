'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@repo/ui'
const page = () => {
  return (
    <div className="bg-background w-screen h-svh pb-8">
      <div className="max-w-screen-lg w-full mx-auto h-full font-roboto grid grid-cols-2 pt-[10%]">
        <div>
          <h1 className="text-5xl font-bold text-primary capitalize tracking-[-.0325em] leading-[1.1]">
            Venue <span className="uppercase">Dashboard</span>
          </h1>
          <p className="text-lg text-foreground/70 leading-[28px] tracking-[-0.37px] font-medium my-2">
            Add venue details to get booked for events
          </p>
          <ol className="font-mono list-decimal pl-8">
            <li>Register your place and Add photos</li>
            <li>After verifying by us, it'll be public for everyone</li>
          </ol>
          <div className="flex gap-4 my-4">
            <Button asChild>
              <Link href={'/signup'}>Start with Signup</Link>
            </Button>
            <Button asChild>
              <Link href={'/login'}>Login</Link>
            </Button>
          </div>
        </div>
        <GithubStar />
        <RandomNumberGenerator />
      </div>
    </div>
  )
}
function GithubStar() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/rahul-MyGit/eventOrganize').then((res) =>
        res.json(),
      ),
  })
  if (isPending)
    return (
      <Button variant={'outline'} className="justify-self-end">
        Loading...
      </Button>
    )
  if (error) return 'An error has occurred: ' + error.message
  return (
    <Button asChild variant={'outline'} className="gap-1 justify-self-end">
      <Link
        href="https://github.com/rahul-MyGit/eventOrganize"
        target="_blank"
      >
        <Image
          width={16}
          height={16}
          src={'/github.svg'}
          alt="Github"
          className="h-4 dark:invert"
        />
        <strong>Star</strong>
        <span className="ml-2">{data.stargazers_count}</span>
      </Link>
    </Button>
  )
}
function RandomNumberGenerator() {
  const [count, setCount] = useState(0)
  const generateRandomNumber = () => {
    setCount(Math.floor(Math.random() * 1000))
  }
  useEffect(generateRandomNumber, [setCount])
  return (
    <div className="grid place-items-center gap-2 col-span-2 self-start">
      <span>{count}</span>
      <Button variant={'secondary'} onClick={generateRandomNumber}>
        Generate Random Number
      </Button>
    </div>
  )
}
export default page
