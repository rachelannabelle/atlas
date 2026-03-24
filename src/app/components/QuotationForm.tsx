import { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Minus, Plus, ChevronDown, ChevronUp, Trash2, Pencil, MoreHorizontal, Eraser, Calendar, Upload, Paperclip, X, Check } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  markup: number;
  unitPrice: number;
}

interface TermsCondition {
  id: string;
  text: string;
}

interface SelectedScheduleItem {
  id: string;
  title: string;
  rate: string;
  unitPrice: number;
}

interface ClientDetails {
  name: string;
  company: string;
  address: string;
  email: string;
}

interface EmailAttachment {
  id: string;
  name: string;
  url: string;
}

const EXISTING_CLIENTS: { label: string; details: ClientDetails }[] = [
  {
    label: '20 Woodlands Link',
    details: {
      name: 'Jia Xun',
      company: 'JTC Corporation',
      address: '8 Jurong Town Hall Rd, Singapore 609434',
      email: 'WONG_Jia_Xun@jtc.gov.sg',
    },
  },
  {
    label: '22 Woodlands Link',
    details: {
      name: 'Shu Man',
      company: 'JTC Corporation',
      address: '8 Jurong Town Hall Rd, Singapore 609434',
      email: 'ANG_Shu_Man@jtc.gov.sg',
    },
  },
  {
    label: '15 Woodlands Loop',
    details: {
      name: 'Yi Ting',
      company: 'JTC Corporation',
      address: '8 Jurong Town Hall Rd, Singapore 609434',
      email: 'TAN_Yi_Ting@jtc.gov.sg',
    },
  },
];

const STANDARD_TERMS = [
  'The above quote does not include the 9% Goods and Services Tax (GST).',
  'Payment term is 30 days from the date of invoice.',
  'Standard Terms & Conditions Item 1',
  'Standard Terms & Conditions Item 2',
  'Standard Terms & Conditions Item 3',
  'Standard Terms & Conditions Item 4',
];

interface QuotationFormProps {
  selectedItems?: SelectedScheduleItem[];
}

export function QuotationForm({ selectedItems = [] }: QuotationFormProps) {
  const initialItems: QuotationItem[] = selectedItems.map((item) => ({
    id: item.id,
    description: item.title,
    quantity: 1,
    markup: 0,
    unitPrice: item.unitPrice,
  }));

  const [items, setItems] = useState<QuotationItem[]>(initialItems);

  // Company Details
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [picName, setPicName] = useState('');
  const [picEmail, setPicEmail] = useState('');

  // Quotation Details
  const [quotationNumber, setQuotationNumber] = useState('');
  const [quotationDate, setQuotationDate] = useState('');
  const [effectivePeriod, setEffectivePeriod] = useState<number | ''>('');
  const [referenceNo, setReferenceNo] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const validUntilInputRef = useRef<HTMLInputElement>(null);

  // Computed Valid Until
  const computeValidUntilDate = useMemo(() => {
    const baseDate = new Date(quotationDate + 'T00:00:00');
    if (isNaN(baseDate.getTime())) return '';
    const validDate = new Date(baseDate);
    validDate.setDate(validDate.getDate() + (effectivePeriod || 0));
    return validDate.toISOString().split('T')[0];
  }, [quotationDate, effectivePeriod]);

  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Client Details
  const [selectedClientIndex, setSelectedClientIndex] = useState<number>(-1);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState<ClientDetails>({ name: '', company: '', address: '', email: '' });
  const [sendAsEmail, setSendAsEmail] = useState(false);
  const [emailAttachments, setEmailAttachments] = useState<EmailAttachment[]>([]);

  // Terms
  const [terms, setTerms] = useState<string[]>([]);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsSelection, setTermsSelection] = useState<Set<string>>(new Set());

  // GST
  const [gstRate, setGstRate] = useState(9);

  // Collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    company: true,
    details: true,
    client: true,
    terms: true,
    items: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Close client dropdown on outside click
  useEffect(() => {
    if (!clientDropdownOpen) return;
    const handleClickOutside = () => setClientDropdownOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [clientDropdownOpen]);

  // Client handlers
  const handleSelectClient = (index: number) => {
    setSelectedClientIndex(index);
    setClientDetails({ ...EXISTING_CLIENTS[index].details });
    setClientDropdownOpen(false);
  };

  const handleClearClient = () => {
    setClientDetails({ name: '', company: '', address: '', email: '' });
    setSelectedClientIndex(-1);
  };

  const handleClientFieldChange = (field: keyof ClientDetails, value: string) => {
    setClientDetails(prev => ({ ...prev, [field]: value }));
  };

  // Email attachments
  const handleEmailDocumentUpload = (files: FileList | null) => {
    if (!files) return;
    const validFiles = Array.from(files)
      .filter((f) => f.size <= 5 * 1024 * 1024)
      .slice(0, 5 - emailAttachments.length);

    const newDocs: EmailAttachment[] = validFiles.map((f) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    setEmailAttachments(prev => [...prev, ...newDocs]);
  };

  const handleRemoveEmailDocument = (docId: string) => {
    setEmailAttachments(prev => prev.filter(doc => doc.id !== docId));
  };

  // Terms handlers
  const handleOpenTermsModal = () => {
    setTermsSelection(new Set(terms));
    setTermsModalOpen(true);
  };

  const handleToggleTerm = (term: string) => {
    setTermsSelection(prev => {
      const next = new Set(prev);
      if (next.has(term)) {
        next.delete(term);
      } else {
        next.add(term);
      }
      return next;
    });
  };

  const handleAddTerms = () => {
    const existing = terms.filter(t => termsSelection.has(t));
    const added = [...termsSelection].filter(t => !terms.includes(t));
    setTerms([...existing, ...added]);
    setTermsModalOpen(false);
  };

  const handleRemoveTerm = (term: string) => {
    setTerms(prev => prev.filter(t => t !== term));
  };

  // Item handlers
  const updateItemQuantity = (id: string, delta: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ));
  };

  const updateItemMarkup = (id: string, markup: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, markup } : item
    ));
  };

  const calculateItemTotal = (item: QuotationItem) => {
    const basePrice = item.quantity * item.unitPrice;
    const markupAmount = basePrice * (item.markup / 100);
    return basePrice + markupAmount;
  };

  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const gstAmount = subtotal * (gstRate / 100);
  const total = subtotal + gstAmount;

  return (
    <div className="max-w-[620px] mx-auto space-y-0">
      {/* Company Details Section */}
      <div className="border-b border-[#e4e7eb] py-6 px-6">
        <button
          onClick={() => toggleSection('company')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
            Company Details
          </h3>
          {expandedSections.company ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {expandedSections.company && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-[12.9px] text-[#57606a]">
                Company Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="h-[38px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address" className="text-[12.9px] text-[#57606a]">
                Address <span className="text-red-400">*</span>
              </Label>
              <Input
                id="company-address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Enter company address"
                className="h-[38px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration-no" className="text-[12.9px] text-[#57606a]">
                Registration No <span className="text-red-400">*</span>
              </Label>
              <Input
                id="registration-no"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                placeholder="Enter registration number"
                className="h-[38px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pic-name" className="text-[12.9px] text-[#57606a]">
                PIC Name
              </Label>
              <Input
                id="pic-name"
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                placeholder="Enter PIC name"
                className="h-[38px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pic-email" className="text-[12.9px] text-[#57606a]">
                PIC Email
              </Label>
              <Input
                id="pic-email"
                type="email"
                value={picEmail}
                onChange={(e) => setPicEmail(e.target.value)}
                placeholder="Enter PIC email"
                className="h-[38px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Quotation Details Section */}
      <div className="border-b border-[#e4e7eb] py-6 px-6">
        <button
          onClick={() => toggleSection('details')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
            Quotation Details
          </h3>
          {expandedSections.details ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {expandedSections.details && (
          <div className="space-y-4">
            {/* Quote No + Date row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quotation-number" className="text-[12.9px] text-[#57606a]">
                  Quote No <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="quotation-number"
                  value={quotationNumber}
                  onChange={(e) => setQuotationNumber(e.target.value)}
                  placeholder="e.g. 20260303160000"
                  className="h-[38px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[12.9px] text-[#57606a]">
                  Date <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={quotationDate}
                    onChange={(e) => setQuotationDate(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center justify-between px-3 h-[38px] rounded-md bg-input-background transition-[color,box-shadow]">
                    <span className={`text-sm ${quotationDate ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {quotationDate ? formatDisplayDate(quotationDate) : 'Select date'}
                    </span>
                    <Calendar className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Effective Period + Valid Until */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effective-period" className="text-[12.9px] text-[#57606a]">
                  Effective Period (Days)
                </Label>
                <Input
                  id="effective-period"
                  type="number"
                  value={effectivePeriod}
                  onChange={(e) => setEffectivePeriod(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  className="h-[38px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="e.g. 30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[12.9px] text-[#57606a]">
                  Valid Until <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <input
                    ref={validUntilInputRef}
                    type="date"
                    value={computeValidUntilDate}
                    readOnly
                    className="absolute inset-0 w-full h-full opacity-0 cursor-default z-10"
                  />
                  <div className="flex items-center justify-between px-3 h-[38px] rounded-md bg-input-background">
                    <span className="text-sm text-foreground">
                      {computeValidUntilDate ? formatDisplayDate(computeValidUntilDate) : '—'}
                    </span>
                    <Calendar className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Number */}
            <div className="space-y-2">
              <Label htmlFor="reference-no" className="text-[12.9px] text-[#57606a]">
                Reference Number
              </Label>
              <Input
                id="reference-no"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="e.g. PO-2026-001"
                className="h-[38px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Client Details Section */}
      <div className="border-b border-[#e4e7eb] py-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('client')}
            className="flex items-center gap-2"
          >
            <h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
              Client Details
            </h3>
            {expandedSections.client ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
          {expandedSections.client && (
            <button
              onClick={handleClearClient}
              className="p-1.5 hover:bg-accent rounded-lg transition-colors"
              title="Clear client details"
            >
              <Eraser className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {expandedSections.client && (
          <div className="space-y-4">
            {/* Client Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setClientDropdownOpen(!clientDropdownOpen);
                }}
                className="w-full flex items-center justify-between px-3 h-[38px] rounded-md bg-input-background transition-colors text-left"
              >
                <span className={`text-sm ${selectedClientIndex >= 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {selectedClientIndex >= 0 ? EXISTING_CLIENTS[selectedClientIndex].label : 'Select a client'}
                </span>
                <ChevronDown className={`size-4 text-muted-foreground transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {clientDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#e4e7eb] rounded-lg shadow-lg z-50 py-1">
                  {EXISTING_CLIENTS.map((client, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectClient(index);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedClientIndex === index
                          ? 'bg-[#EBEBFC] text-[#3C3DEC]'
                          : 'text-[#0d1117] hover:bg-accent'
                      }`}
                    >
                      {client.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Name + Company row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name" className="text-[12.9px] text-[#57606a]">
                  Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="client-name"
                  value={clientDetails.name}
                  onChange={(e) => handleClientFieldChange('name', e.target.value)}
                  placeholder="Contact name"
                  className="h-[38px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-company" className="text-[12.9px] text-[#57606a]">
                  Company <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="client-company"
                  value={clientDetails.company}
                  onChange={(e) => handleClientFieldChange('company', e.target.value)}
                  placeholder="Company name"
                  className="h-[38px]"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="client-address" className="text-[12.9px] text-[#57606a]">
                Address <span className="text-red-400">*</span>
              </Label>
              <Input
                id="client-address"
                value={clientDetails.address}
                onChange={(e) => handleClientFieldChange('address', e.target.value)}
                placeholder="Client address"
                className="h-[38px]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="client-email" className="text-[12.9px] text-[#57606a]">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="client-email"
                type="email"
                value={clientDetails.email}
                onChange={(e) => handleClientFieldChange('email', e.target.value)}
                placeholder="Client email"
                className="h-[38px]"
              />
            </div>

            {/* Send as Email Toggle */}
            <div className="flex items-center justify-between pt-2">
              <label className="text-sm text-[#57606a]">Send Quotation as email</label>
              <button
                onClick={() => setSendAsEmail(!sendAsEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  sendAsEmail ? 'bg-[#3C3DEC]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    sendAsEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Email Description */}
            {sendAsEmail && (
              <p className="text-xs text-muted-foreground">
                Quotation and attachments will be emailed to {clientDetails.email}, {picEmail}, demo@cbre.com and buildingadmin@cbre.com
              </p>
            )}

            {/* Document Dropzone - Only show when toggle is on */}
            {sendAsEmail && (
              <div>
                <Label className="text-[12.9px] text-[#57606a] mb-2 block">Attach Documents</Label>
                <div className="border-2 border-dashed border-[#e4e7eb] rounded-lg p-4 hover:border-[#3C3DEC]/40 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleEmailDocumentUpload(e.target.files)}
                    className="hidden"
                    id="email-doc-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                  <label
                    htmlFor="email-doc-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="size-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-[#57606a]">Drop files here or click to upload</span>
                    <span className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, PNG, JPG (max 5MB)</span>
                  </label>
                </div>

                {/* Uploaded Documents List */}
                {emailAttachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {emailAttachments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between px-3 py-2 bg-accent/50 rounded-lg border border-[#e4e7eb]"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Paperclip className="size-4 text-muted-foreground shrink-0" />
                          <span className="text-sm text-[#0d1117] truncate">{doc.name}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveEmailDocument(doc.id)}
                          className="p-1 hover:bg-accent rounded transition-colors shrink-0"
                        >
                          <X className="size-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Terms & Conditions Section */}
      <div className="border-b border-[#e4e7eb] py-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('terms')}
            className="flex items-center gap-2"
          >
            <h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
              Terms & Conditions
            </h3>
            {expandedSections.terms ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
          {expandedSections.terms && (
            <button
              onClick={handleOpenTermsModal}
              className="flex items-center gap-1 text-xs text-[#3C3DEC] hover:text-[#2d2eb8] transition-colors"
            >
              <Plus className="size-3.5" />
              Add item
            </button>
          )}
        </div>

        {expandedSections.terms && (
          <>
            {terms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-[#e4e7eb] rounded-lg bg-accent/30">
                <p className="text-sm text-muted-foreground mb-4">No terms added yet</p>
                <Button
                  onClick={handleOpenTermsModal}
                  className="bg-[#3C3DEC] text-white hover:bg-[#2d2eb8]"
                >
                  Add T&C items
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {terms.map((term, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 border border-[#e4e7eb] rounded-lg bg-accent/30"
                  >
                    <span className="text-xs text-muted-foreground mt-0.5 shrink-0">{idx + 1}.</span>
                    <span className="text-sm text-[#57606a] flex-1">{term}</span>
                    <button
                      onClick={() => handleRemoveTerm(term)}
                      className="p-1 hover:bg-accent rounded transition-colors shrink-0"
                    >
                      <Trash2 className="size-3.5 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Items Section */}
      <div className="border-b border-[#e4e7eb] py-6 px-6">
        <button
          onClick={() => toggleSection('items')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
            Items ({items.length})
          </h3>
          {expandedSections.items ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {expandedSections.items && (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border-b border-[#f0f0f0] pb-6 last:border-0">
                <div className="space-y-3">
                  <div className="text-[13.9px] font-medium text-[#0d0d0d] leading-[21px]">
                    {item.description}
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex gap-[60px]">
                      <div className="space-y-2">
                        <Label className="text-[11.2px] text-[#666]">Qty</Label>
                        <div className="flex items-center gap-2 bg-[#f7f7f7] rounded-md border border-[#e8e8e8] px-2 h-[33px]">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-transparent"
                            onClick={() => updateItemQuantity(item.id, -1)}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="text-[13.7px] font-medium text-[#0d0d0d] w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-transparent"
                            onClick={() => updateItemQuantity(item.id, 1)}
                          >
                            <Plus className="size-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`markup-${item.id}`} className="text-[11.2px] text-[#666]">
                          Markup
                        </Label>
                        <div className="relative w-[80px]">
                          <Input
                            id={`markup-${item.id}`}
                            type="number"
                            value={item.markup}
                            onChange={(e) => updateItemMarkup(item.id, Number(e.target.value))}
                            className="h-[32px] pr-6"
                            min="0"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[15.8px] text-[#0d0d0d]">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[19.2px] font-semibold text-[#0d0d0d] leading-[20px]">
                        ${calculateItemTotal(item).toFixed(2)}
                      </div>
                      <div className="text-[11.8px] text-[#666] leading-[14.4px]">
                        ${item.unitPrice.toFixed(2)}/m³
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="py-6 px-6">
        <div className="bg-[#f6f8fa] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between py-2 px-3">
            <span className="text-[14.6px] font-semibold text-[#57606a]">Subtotal</span>
            <span className="text-[15.1px] font-bold text-[#0d1117]">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between py-2 px-3">
            <div className="flex items-center gap-8">
              <span className="text-[14.6px] font-semibold text-[#57606a]">GST</span>
              <div className="relative w-[57px]">
                <Input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="h-[32px] pr-6 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="0"
                  max="100"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[13.8px]">%</span>
              </div>
            </div>
            <span className="text-[15.1px] font-bold text-[#0d1117]">${gstAmount.toFixed(2)}</span>
          </div>

          <div className="bg-gradient-to-r from-[rgba(26,127,55,0.02)] to-transparent rounded-lg border-t-2 border-[#e4e7eb] py-6 px-3 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[15.5px] font-bold text-[#0d1117] tracking-[0.8px] uppercase">Total</span>
              <span className="text-[15.1px] font-bold text-[#0d1117] tracking-[-0.32px]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="py-6 px-6 flex gap-3 justify-end border-t border-[#e4e7eb]">
        <Button variant="outline">Save as Draft</Button>
        <Button style={{ backgroundColor: '#3C3DEC' }} className="text-white hover:opacity-90">
          Generate Quotation
        </Button>
      </div>

      {/* Terms & Conditions Modal */}
      <Dialog open={termsModalOpen} onOpenChange={setTermsModalOpen}>
        <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Select Terms & Conditions</DialogTitle>
            <DialogDescription className="text-sm">
              Choose standard terms to include in this quotation.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2 max-h-[300px] overflow-y-auto">
            {STANDARD_TERMS.map((term, idx) => (
              <button
                key={idx}
                onClick={() => handleToggleTerm(term)}
                className={`flex items-start gap-3 w-full px-3 py-2.5 rounded-md text-left transition-colors ${
                  termsSelection.has(term)
                    ? 'bg-[#EBEBFC] border border-[#3C3DEC]/30'
                    : 'hover:bg-accent border border-transparent'
                }`}
              >
                <div className={`flex items-center justify-center size-5 rounded border shrink-0 mt-0.5 ${
                  termsSelection.has(term)
                    ? 'bg-[#3C3DEC] border-[#3C3DEC]'
                    : 'border-[#e4e7eb]'
                }`}>
                  {termsSelection.has(term) && (
                    <Check className="size-3 text-white" />
                  )}
                </div>
                <span className="text-sm text-[#0d1117]">{term}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setTermsModalOpen(false)}>Cancel</Button>
            <Button
              onClick={handleAddTerms}
              style={{ backgroundColor: '#3C3DEC' }}
              className="text-white hover:opacity-90"
            >
              Add Selected ({termsSelection.size})
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}