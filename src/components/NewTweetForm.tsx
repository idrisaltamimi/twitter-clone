import { useSession } from "next-auth/react"
import { FormEvent, useCallback, useLayoutEffect, useRef, useState } from "react"
import { api } from "~/utils/api"

import Button from "./Button"
import ProfileImage from "./ProfileImage"

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return
  textArea.style.height = "0"
  textArea.style.height = `${textArea.scrollHeight}px`
}

const NewTweetForm = () => {
  const session = useSession()

  if (session.status !== "authenticated") return null

  return <Form />
}

function Form() {
  const session = useSession()
  const [inputValue, setInputValue] = useState<string>("")
  const textAreaRef = useRef<HTMLTextAreaElement>()

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea)
    textAreaRef.current = textArea
  }, [])

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current)
  }, [inputValue])

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("")
    }
  })

  if (session.status !== "authenticated") return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    createTweet.mutate({ content: inputValue })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-4 py-2 border-b">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          style={{ height: 0 }}
          ref={inputRef}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  )
}

export default NewTweetForm