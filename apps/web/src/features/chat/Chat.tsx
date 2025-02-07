 import { useChat } from "ai/react"
 
import { Chat } from "@/components/ui/chat"
import { t } from "i18next"
import { useAuthContext } from "@/security/auth"
import { useNavigate } from "@tanstack/react-router";
  
export default function ChatPage () {
  const logout = useAuthContext(store => store.logout);
  const navigate = useNavigate();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat({
    api: `${import.meta.env.VITE_API_URL}/api/ask`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    credentials: "include"
  })

  const onLogoutPressed = () => {
    logout();
    navigate({to: "/login"});
  };

  //Chat component comes from https://shadcn-chatbot-kit.vercel.app/ and https://ui.shadcn.com/docs/installation/manual
  return (
    <div className="flex flex-col h-dvh">
      <div className="sticky flex flex-row items-center justify-center h-20">
        <div className="hidden max-lg:w-20">

        </div>
        <div className="flex justify-center max-sm:justify-start max-sm:pl-5 grow">
          <span className="text-4xl font-extrabold">Odonto Chat</span>
        </div>
        <div className="w-20 cursor-pointer" onClick={onLogoutPressed}>
          <span>Logout</span> 
        </div>
      </div>
      <Chat
        className="p-14 grow max-md:p-5"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          t("How to do a proper dental cleaning?"),
          t("A dentist is about to perform an extraction of a maxillary third molar and needs to choose the most appropriate anesthetic technique. Which of the following techniques would provide effective pulpal anesthesia for the procedure?"),
          t("Regarding ergonomics applied to dental work, what is a recommended practice to avoid repetitive strain injuries?"),
        ]}
      />
    </div>
  )
}
