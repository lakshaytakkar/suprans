import { useParams } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  MessageSquare,
  FileText,
  Clock,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  MapPin,
  Globe,
  User,
  Users,
  Building2,
  DollarSign,
  Tag
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { stages } from "@/lib/mock-data";

import { LogActivityDialog } from "@/components/dialogs/LogActivityDialog";
import { EditLeadDialog } from "@/components/dialogs/EditLeadDialog";
import { GenerateQuoteDialog } from "@/components/dialogs/GenerateQuoteDialog";
import { SendEmailDialog } from "@/components/dialogs/SendEmailDialog";
import { SendWhatsAppDialog } from "@/components/dialogs/SendWhatsAppDialog";

export default function LeadDetail() {
  const params = useParams();
  const { leads, activities, currentUser, addActivity, updateLeadStage } = useStore();
  const [note, setNote] = useState("");

  const lead = leads.find(l => l.id === params.id);
  const leadActivities = activities
    .filter(a => a.leadId === lead?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!lead) {
    return <div className="p-8">Lead not found</div>;
  }

  const handleAddNote = () => {
    if (!note.trim()) return;
    addActivity({
      leadId: lead.id,
      userId: currentUser.id,
      type: 'note',
      notes: note
    });
    setNote("");
  };

  const getStageBadgeStyles = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    switch (stage?.color) {
      case 'blue': return "bg-white text-blue-500 border-blue-500";
      case 'yellow': return "bg-white text-orange-500 border-orange-500";
      case 'purple': return "bg-white text-purple-500 border-purple-500";
      case 'green': return "bg-white text-emerald-500 border-emerald-500";
      case 'gray': return "bg-white text-gray-500 border-gray-300";
      default: return "bg-white text-gray-500 border-gray-300";
    }
  };

  const getStageDotColor = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    switch (stage?.color) {
      case 'blue': return "bg-blue-500";
      case 'yellow': return "bg-orange-500";
      case 'purple': return "bg-purple-500";
      case 'green': return "bg-emerald-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto pb-8">
      {/* Header Navigation */}
      <div className="flex items-center text-sm text-[#666D80] gap-2">
        <Link href="/leads">
          <a className="hover:text-[#0D0D12] transition-colors flex items-center gap-1">
            <Users className="h-4 w-4" />
            Leads
          </a>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#0D0D12] font-medium truncate">{lead.name}</span>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white border border-[#DFE1E7] rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <Avatar className="h-[80px] w-[80px] border border-[#DFE1E7] shadow-sm">
            <AvatarImage src={lead.avatar} className="object-cover" />
            <AvatarFallback className="text-xl bg-[#F8F9FB]">{lead.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-bold text-[#0D0D12] leading-tight">{lead.name}</h1>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[16px] border ${getStageBadgeStyles(lead.stage)}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${getStageDotColor(lead.stage)}`} />
                <span className="text-[12px] font-medium tracking-[0.12px]">
                  {stages.find(s => s.id === lead.stage)?.label}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#666D80]">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                {lead.company}
              </div>
              <div className="w-1 h-1 rounded-full bg-[#DFE1E7]" />
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {lead.address || "No location"}
              </div>
              <div className="w-1 h-1 rounded-full bg-[#DFE1E7]" />
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                {lead.source}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LogActivityDialog 
            leadId={lead.id} 
            defaultType="call"
            trigger={
              <Button variant="outline" className="h-[40px] border-[#DFE1E7] text-[#0D0D12] font-medium shadow-sm hover:bg-gray-50">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            }
          />
          <SendEmailDialog 
            leadId={lead.id} 
            trigger={
              <Button variant="outline" className="h-[40px] border-[#DFE1E7] text-[#0D0D12] font-medium shadow-sm hover:bg-gray-50">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            }
          />
          <SendWhatsAppDialog 
            leadId={lead.id} 
            trigger={
              <Button variant="outline" className="h-[40px] border-[#DFE1E7] text-[#0D0D12] font-medium shadow-sm hover:bg-gray-50">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            }
          />
          <div className="h-8 w-[1px] bg-[#DFE1E7] mx-1" />
          {lead.stage !== 'won' && (
            <Button 
              onClick={() => updateLeadStage(lead.id, 'won')} 
              className="h-[40px] bg-[#10B981] hover:bg-[#059669] text-white border border-[#10B981] shadow-sm font-medium"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Won
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-[40px] w-[40px] border-[#DFE1E7] text-[#666D80]">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <GenerateQuoteDialog leadId={lead.id} trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}><FileText className="mr-2 h-4 w-4" /> Generate Quote</DropdownMenuItem>} />
              <DropdownMenuItem className="text-red-600"><XCircle className="mr-2 h-4 w-4" /> Mark as Lost</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Info Cards */}
        <div className="space-y-6 lg:col-span-1">
          {/* Key Details */}
          <div className="bg-white border border-[#DFE1E7] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#DFE1E7] flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-[#0D0D12]">Lead Details</h3>
              <EditLeadDialog leadId={lead.id} trigger={<Button variant="ghost" size="sm" className="h-8 text-[#F34147] hover:text-[#D93036] hover:bg-[#FFF0F3]">Edit</Button>} />
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFFEFA] flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#666D80] uppercase tracking-wide">Deal Value</p>
                    <p className="text-[16px] font-bold text-[#0D0D12]">₹{lead.value.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#666D80] flex items-center gap-1.5">
                    <Tag className="h-3 w-3" /> Interested Service
                  </p>
                  <p className="text-sm font-medium text-[#0D0D12]">{lead.service}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#666D80] flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <a href={`mailto:${lead.email}`} className="text-sm font-medium text-[#F34147] hover:underline truncate block">
                    {lead.email}
                  </a>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#666D80] flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <a href={`tel:${lead.phone}`} className="text-sm font-medium text-[#0D0D12] hover:underline block">
                    {lead.phone}
                  </a>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#666D80] flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> Created
                  </p>
                  <p className="text-sm text-[#0D0D12]">
                    {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Preview (if needed) or other widgets */}
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="activity" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-white border border-[#DFE1E7] p-1 h-[44px] rounded-[10px]">
                <TabsTrigger value="activity" className="rounded-[8px] data-[state=active]:bg-[#F34147] data-[state=active]:text-white text-[#666D80]">Timeline</TabsTrigger>
                <TabsTrigger value="notes" className="rounded-[8px] data-[state=active]:bg-[#F34147] data-[state=active]:text-white text-[#666D80]">Notes</TabsTrigger>
                <TabsTrigger value="files" className="rounded-[8px] data-[state=active]:bg-[#F34147] data-[state=active]:text-white text-[#666D80]">Documents</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="activity" className="space-y-4 outline-none">
              <div className="bg-white border border-[#DFE1E7] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#DFE1E7]">
                  <h3 className="text-[16px] font-semibold text-[#0D0D12]">Activity History</h3>
                </div>
                <div className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-6 space-y-8">
                      {leadActivities.length === 0 ? (
                        <div className="text-center py-10 text-[#666D80]">No activities recorded yet.</div>
                      ) : (
                        leadActivities.map((activity, i) => (
                          <div key={activity.id} className="relative flex gap-4">
                            {/* Line connector */}
                            {i !== leadActivities.length - 1 && (
                              <div className="absolute left-[15px] top-10 h-full w-[2px] bg-[#F1F5F9]" />
                            )}
                            
                            <div className="relative z-10 shrink-0">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm
                                ${activity.type === 'call' ? 'bg-blue-100 text-blue-600' : ''}
                                ${activity.type === 'email' ? 'bg-orange-100 text-orange-600' : ''}
                                ${activity.type === 'meeting' ? 'bg-purple-100 text-purple-600' : ''}
                                ${activity.type === 'stage_change' ? 'bg-gray-100 text-gray-600' : ''}
                                ${activity.type === 'note' ? 'bg-yellow-100 text-yellow-600' : ''}
                              `}>
                                {activity.type === 'call' && <Phone className="h-4 w-4" />}
                                {activity.type === 'email' && <Mail className="h-4 w-4" />}
                                {activity.type === 'meeting' && <Calendar className="h-4 w-4" />}
                                {activity.type === 'stage_change' && <TrendingUp className="h-4 w-4" />}
                                {activity.type === 'note' && <FileText className="h-4 w-4" />}
                              </div>
                            </div>
                            
                            <div className="flex-1 pb-4">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-semibold text-[#0D0D12] capitalize">
                                  {activity.type.replace('_', ' ')}
                                </p>
                                <span className="text-xs text-[#666D80]">
                                  {format(new Date(activity.createdAt), 'MMM d, h:mm a')}
                                </span>
                              </div>
                              <div className="bg-[#F8F9FB] rounded-[12px] p-3 border border-[#F1F5F9]">
                                <p className="text-sm text-[#0D0D12] leading-relaxed">
                                  {activity.notes}
                                </p>
                                {activity.duration && (
                                  <Badge variant="outline" className="text-[10px] h-5 mt-2 bg-white border-[#DFE1E7]">
                                    {activity.duration} mins
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="outline-none">
              <div className="bg-white border border-[#DFE1E7] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] p-6">
                <h3 className="text-[16px] font-semibold text-[#0D0D12] mb-4">Add a Note</h3>
                <Textarea 
                  placeholder="Type your note here..." 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[120px] bg-[#F8F9FB] border-[#DFE1E7] rounded-[12px] focus-visible:ring-[#F34147] mb-4"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddNote}
                    className="bg-[#F34147] hover:bg-[#D93036] text-white rounded-[10px]"
                  >
                    Save Note
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="files" className="outline-none">
              <div className="bg-white border border-[#DFE1E7] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] h-[300px] flex flex-col items-center justify-center text-[#666D80]">
                <FileText className="h-12 w-12 text-[#DFE1E7] mb-3" />
                <p className="font-medium">No documents uploaded yet</p>
                <Button variant="link" className="text-[#F34147]">Upload Document</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";