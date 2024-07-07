import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [collaborators, setCollaborators] = useState([
    { name: "Alice", online: true },
    { name: "Bob", online: false },
  ]);
  const [messages, setMessages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Collaborate on Business List</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Invite Collaborators</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Collaborators</DialogTitle>
            </DialogHeader>
            <Input placeholder="Enter email addresses" />
            <Button className="mt-2">Send Invitations</Button>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Collaborators</h2>
          <ScrollArea className="h-48">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center space-x-2 py-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-10 h-10" />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{collaborator.name}</p>
                  <Badge variant={collaborator.online ? "success" : "secondary"}>
                    {collaborator.online ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        <div className="col-span-2 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Chat</h2>
            <ScrollArea className="h-48">
              {messages.map((message, index) => (
                <div key={index} className="py-2">
                  <p>
                    <strong>{message.sender}</strong> <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </p>
                  <p>{message.content}</p>
                </div>
              ))}
            </ScrollArea>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Activity Feed</h2>
            <ScrollArea className="h-48">
              {activities.map((activity, index) => (
                <div key={index} className="py-2">
                  <p>
                    <strong>{activity.user}</strong> <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </p>
                  <p>{activity.action}</p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
