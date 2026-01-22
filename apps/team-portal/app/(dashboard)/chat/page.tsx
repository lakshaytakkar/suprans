"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";

// Mock chat data
const mockConversations = [
  {
    id: "1",
    name: "John Smith",
    lastMessage: "I'll send the proposal today",
    timestamp: "10:30 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    lastMessage: "Can you check the lead details?",
    timestamp: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    name: "Mike Davis",
    lastMessage: "Meeting confirmed for 3 PM",
    timestamp: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    name: "Team Announcements",
    lastMessage: "New pricing update effective Monday",
    timestamp: "2 days ago",
    unread: 1,
  },
];

const mockMessages = [
  {
    id: "1",
    senderId: "user-2",
    content: "Hi! How is the Acme Corporation deal going?",
    timestamp: "10:15 AM",
  },
  {
    id: "2",
    senderId: "user-1",
    content:
      "Going well! They requested a proposal. I'm preparing it now.",
    timestamp: "10:20 AM",
  },
  {
    id: "3",
    senderId: "user-2",
    content: "Great! Let me know if you need any help with pricing.",
    timestamp: "10:25 AM",
  },
  {
    id: "4",
    senderId: "user-1",
    content: "Will do. I'll send the proposal today.",
    timestamp: "10:30 AM",
  },
];

export default function ChatPage() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    "1"
  );
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || "user-1",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredConversations = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Conversations List */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Messages</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors",
                    selectedConversation === conversation.id && "bg-muted"
                  )}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">
                        {conversation.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {mockConversations
                      .find((c) => c.id === selectedConversation)
                      ?.name.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">
                    {
                      mockConversations.find(
                        (c) => c.id === selectedConversation
                      )?.name
                    }
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isOwn = message.senderId === (user?.id || "user-1");
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[70%] rounded-lg px-4 py-2",
                            isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={cn(
                              "text-[10px] mt-1",
                              isOwn
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">
              Select a conversation to start messaging
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
