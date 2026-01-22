import { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Paperclip, 
  Send, 
  Smile, 
  Image as ImageIcon,
  MoreVertical,
  Check,
  CheckCheck,
  Hash,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock Data
const teams = [
  {
    id: "t1",
    name: "General",
    avatar: "",
    lastMessage: "Welcome to the team!",
    time: "10:00 am",
    unread: 0,
    type: 'channel'
  },
  {
    id: "t2",
    name: "Sales Team",
    avatar: "",
    lastMessage: "Great job on the Q3 numbers everyone!",
    time: "09:30 am",
    unread: 3,
    type: 'channel'
  },
  {
    id: "t3",
    name: "Leads Updates",
    avatar: "",
    lastMessage: "New lead assigned to Rahul",
    time: "Yesterday",
    unread: 0,
    type: 'channel'
  }
];

const individuals = [
  {
    id: "1",
    name: "Rucas Royal",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    lastMessage: "Can you review the proposal?",
    time: "01:09 am",
    unread: 2,
    online: true,
    role: "Sales Executive"
  },
  {
    id: "2",
    name: "Robert Fox",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    lastMessage: "Meeting rescheduled to 3 PM",
    time: "01:09 am",
    unread: 1,
    online: false,
    role: "Manager"
  },
  {
    id: "3",
    name: "Bessie Cooper",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Thanks for the update",
    time: "01:09 am",
    unread: 0,
    online: true,
    role: "Sales Executive"
  },
  {
    id: "4",
    name: "Cameron Williamson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Please check the new leads",
    time: "01:09 am",
    unread: 0,
    online: false,
    role: "Admin"
  },
];

const messages = [
  {
    id: 1,
    senderId: "1", // Rucas
    text: "Hi, did you get a chance to look at the proposal?",
    time: "08:24 PM",
    type: "text",
    isMe: false,
  },
  {
    id: 3,
    senderId: "me",
    text: "Yes, I'm reviewing it right now. Looks good so far.",
    time: "08:25 PM",
    type: "text",
    isMe: true,
  },
  {
    id: 4,
    senderId: "1",
    text: "Great, let me know if you need any changes.",
    time: "08:26 PM",
    type: "text",
    isMe: false,
  },
  {
    id: 5,
    senderId: "me",
    text: "Will do. I'll send updates by EOD.",
    time: "08:27 PM",
    type: "text",
    isMe: true,
  },
];

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<'teams' | 'individuals'>('teams');
  const [activeChat, setActiveChat] = useState<any>(teams[0]);
  const [messageInput, setMessageInput] = useState("");

  const listItems = activeTab === 'teams' ? teams : individuals;

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 w-full max-w-[1600px] mx-auto">
      {/* Left Sidebar: Contact List */}
      <div className="w-[380px] flex flex-col bg-white border border-[#DFE1E7] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] overflow-hidden shrink-0">
        
        {/* Header */}
        <div className="p-5 border-b border-[#DFE1E7] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#0D0D12]">Internal Chat</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#666D80]">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808897]" />
            <Input 
              placeholder="Search..." 
              className="pl-9 bg-white border-[#DFE1E7] h-[40px] text-sm focus-visible:ring-1 focus-visible:ring-[#F34147]"
            />
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-[#F8F9FB] rounded-lg border border-[#DFE1E7]">
            <button
              onClick={() => setActiveTab('teams')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all",
                activeTab === 'teams' 
                  ? "bg-white text-[#0D0D12] shadow-sm" 
                  : "text-[#666D80] hover:text-[#0D0D12]"
              )}
            >
              <Users className="h-4 w-4" />
              Teams
            </button>
            <button
              onClick={() => setActiveTab('individuals')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all",
                activeTab === 'individuals' 
                  ? "bg-white text-[#0D0D12] shadow-sm" 
                  : "text-[#666D80] hover:text-[#0D0D12]"
              )}
            >
              <Avatar className="h-4 w-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-[8px]">U</AvatarFallback>
              </Avatar>
              Individuals
            </button>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {listItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveChat(item)}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-[#F6F8FA] last:border-none hover:bg-[#F8F9FB]",
                activeChat.id === item.id ? "bg-[#F8F9FB]" : "bg-white"
              )}
            >
              <div className="relative shrink-0">
                {activeTab === 'teams' ? (
                  <div className="h-[48px] w-[48px] border border-[#DFE1E7] rounded-lg bg-[#F34147]/10 flex items-center justify-center text-[#F34147]">
                    <Hash className="h-6 w-6" />
                  </div>
                ) : (
                  <Avatar className="h-[48px] w-[48px] border border-[#DFE1E7]">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                
                {activeTab === 'individuals' && item.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#40C4AA] border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[14px] font-semibold text-[#0D0D12] truncate flex items-center gap-1.5">
                    {activeTab === 'teams' && <Hash className="h-3.5 w-3.5 text-[#666D80]" />}
                    {item.name}
                  </h3>
                  <span className="text-[12px] text-[#666D80]">{item.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] text-[#666D80] truncate flex-1 leading-relaxed">
                    {activeTab === 'individuals' && <span className="text-[#0D0D12] font-medium mr-1">You:</span>}
                    {item.lastMessage}
                  </p>
                  {item.unread > 0 && (
                    <span className="h-[18px] min-w-[18px] flex items-center justify-center rounded-full bg-[#F34147] text-[10px] font-bold text-white px-1">
                      {item.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area: Chat Window */}
      <div className="flex-1 flex flex-col bg-white border border-[#DFE1E7] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] overflow-hidden">
        
        {/* Chat Header */}
        <div className="h-[72px] px-6 border-b border-[#DFE1E7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {activeTab === 'teams' ? (
               <div className="h-[44px] w-[44px] border border-[#DFE1E7] rounded-lg bg-[#F34147]/10 flex items-center justify-center text-[#F34147]">
                 <Hash className="h-5 w-5" />
               </div>
            ) : (
              <Avatar className="h-[44px] w-[44px] border border-[#DFE1E7]">
                <AvatarImage src={activeChat.avatar} />
                <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <h3 className="text-[16px] font-semibold text-[#0D0D12] leading-tight flex items-center gap-2">
                 {activeTab === 'teams' && <Hash className="h-4 w-4 text-[#666D80]" />}
                 {activeChat.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {activeTab === 'teams' ? (
                   <span className="text-[12px] text-[#666D80]">24 members</span>
                ) : (
                  <>
                    <span className="text-[12px] text-[#666D80]">{activeChat.role || "Team Member"}</span>
                    {activeChat.online && (
                      <>
                        <span className="text-[#DFE1E7]">•</span>
                        <span className="text-[12px] text-[#40C4AA] font-medium">Online</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 border-[#DFE1E7] text-[#666D80] hover:text-[#F34147] hover:border-[#F34147] hover:bg-[#FFF0F0]">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-[#DFE1E7] text-[#666D80] hover:text-[#F34147] hover:border-[#F34147] hover:bg-[#FFF0F0]">
              <Video className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-[#DFE1E7] mx-2" />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#666D80]">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FB] space-y-6">
          {messages.map((msg) => {
            return (
              <div 
                key={msg.id} 
                className={cn(
                  "flex items-end gap-3 max-w-[80%]",
                  msg.isMe ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <Avatar className="h-[32px] w-[32px] border border-[#DFE1E7] shrink-0">
                  <AvatarImage src={msg.isMe ? "https://github.com/shadcn.png" : activeChat.avatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div className="flex flex-col gap-1">
                  {/* Name & Time */}
                  <div className={cn("flex items-center gap-2", msg.isMe ? "flex-row-reverse" : "")}>
                    <span className="text-[12px] font-medium text-[#666D80]">
                      {msg.isMe ? "You" : (activeTab === 'teams' ? "Team Member" : activeChat.name)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
                    <span className="text-[12px] text-[#9CA3AF]">{msg.time}</span>
                  </div>

                  {/* Bubble */}
                  <div 
                    className={cn(
                      "p-3 rounded-[12px] text-[14px] leading-relaxed relative shadow-sm",
                      msg.isMe 
                        ? "bg-white border border-[#DFE1E7] text-[#0D0D12] rounded-tr-none" 
                        : "bg-white border border-[#DFE1E7] text-[#0D0D12] rounded-tl-none"
                    )}
                  >
                     {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-5 bg-white border-t border-[#DFE1E7]">
          <div className="flex items-center gap-3 bg-[#F8F9FB] rounded-[12px] p-2 border border-[#DFE1E7] focus-within:ring-1 focus-within:ring-[#F34147] focus-within:border-[#F34147] transition-all">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#666D80] hover:text-[#0D0D12] hover:bg-white shrink-0">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#666D80] hover:text-[#0D0D12] hover:bg-white shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#666D80] hover:text-[#0D0D12] hover:bg-white shrink-0">
              <ImageIcon className="h-5 w-5" />
            </Button>
            
            <div className="h-6 w-px bg-[#DFE1E7] mx-1" />
            
            <input 
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${activeTab === 'teams' ? `#${activeChat.name}` : activeChat.name}...`}
              className="flex-1 bg-transparent border-none outline-none text-sm text-[#0D0D12] placeholder:text-[#9CA3AF] min-w-0"
            />
            
            <Button 
              className="bg-[#F34147] hover:bg-[#D93036] text-white h-9 px-4 rounded-[8px] font-medium shadow-sm transition-all"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}