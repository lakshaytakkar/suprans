"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, MessageSquare, Copy } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  type: "email" | "whatsapp";
  subject: string | null;
  content: string;
  category: string;
  createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates");
        if (res.ok) {
          const data = await res.json();
          setTemplates(data.templates);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const emailTemplates = templates.filter((t) => t.type === "email");
  const whatsappTemplates = templates.filter((t) => t.type === "whatsapp");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
        <p className="text-muted-foreground">
          Pre-built templates for emails and messages
        </p>
      </div>

      <Tabs defaultValue="email">
        <TabsList>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            Email ({emailTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            WhatsApp ({whatsappTemplates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {emailTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onView={() => setSelectedTemplate(template)}
                onCopy={() => copyToClipboard(template.content)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="whatsapp" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {whatsappTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onView={() => setSelectedTemplate(template)}
                onCopy={() => copyToClipboard(template.content)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Preview Dialog */}
      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              {selectedTemplate.subject && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Subject
                  </p>
                  <p className="text-sm bg-muted p-2 rounded">
                    {selectedTemplate.subject}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Content
                </p>
                <pre className="text-sm bg-muted p-4 rounded whitespace-pre-wrap font-sans">
                  {selectedTemplate.content.replace(/\\n/g, "\n")}
                </pre>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(selectedTemplate.content)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Content
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TemplateCard({
  template,
  onView,
  onCopy,
}: {
  template: Template;
  onView: () => void;
  onCopy: () => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{template.name}</CardTitle>
            <Badge variant="outline" className="mt-1 capitalize">
              {template.category}
            </Badge>
          </div>
          {template.type === "email" ? (
            <Mail className="h-5 w-5 text-muted-foreground" />
          ) : (
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {template.subject && (
          <p className="text-sm text-muted-foreground mb-2 truncate">
            Subject: {template.subject}
          </p>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.content.replace(/\\n/g, " ").substring(0, 100)}...
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onView}>
            Preview
          </Button>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
