import React from 'react';
import { X, Plus, Trash2, Check, Pencil, ImagePlus, Upload, MoreHorizontal, Eye, Calendar, Paperclip, ChevronDown, Eraser, ShoppingCart } from 'lucide-react';
import { useQuotationContext } from '../context/QuotationContext';
import { useChatContext } from '../context/ChatContext';

interface LineItemImage {
  id: string;
  name: string;
  url: string;
}

interface LineItem {
  id: string;
  itemCode: string;
  description: string;
  unit: string;
  rate: string;
  quantity: string;
  remark: string;
  images: LineItemImage[];
}

interface ClientDetails {
  name: string;
  company: string;
  address: string;
  email: string;
}

interface QuotationSheetProps {
  open: boolean;
  onClose: () => void;
}

const emptyLineItem = (): LineItem => ({
  id: Date.now().toString() + Math.random().toString(36).slice(2),
  itemCode: '',
  description: '',
  unit: '',
  rate: '',
  quantity: '1',
  remark: '',
  images: [],
});

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

export const QuotationSheet: React.FC<QuotationSheetProps> = ({ open, onClose }) => {
  const { sorLineItems, updateSorItem, removeSorItem, updateSorItemRemark, updateSorItemPictures } = useQuotationContext();
  const { addMessage, updateMessage, currentChatId } = useChatContext();
  const [lineItems, setLineItems] = React.useState<LineItem[]>([]);
  const [quotationNo, setQuotationNo] = React.useState('');
  const [date, setDate] = React.useState(() => new Date().toISOString().split('T')[0]);
  const [effectivePeriod, setEffectivePeriod] = React.useState(30);
  const [companyName, setCompanyName] = React.useState('CBRE GWS PTE LTD');
  const [companyAddress, setCompanyAddress] = React.useState('2 Tanjong Katong Road #06-01, Paya Lebar Quarter, Singapore 437161');
  const [registrationNo, setRegistrationNo] = React.useState('199602432R');
  const [referenceNo, setReferenceNo] = React.useState('');
  const [picName, setPicName] = React.useState('Zarisha');
  const [picEmail, setPicEmail] = React.useState('NurZarisha.AbdulRahman@cbre.com');
  const [notes, setNotes] = React.useState('');
  const [terms, setTerms] = React.useState<string[]>([]);
  const [termsModalOpen, setTermsModalOpen] = React.useState(false);
  const [termsSelection, setTermsSelection] = React.useState<Set<string>>(new Set());
  const [editingRemarkId, setEditingRemarkId] = React.useState<string | null>(null);
  const [editingItemCodeId, setEditingItemCodeId] = React.useState<string | null>(null);
  const [remarkMenuOpenId, setRemarkMenuOpenId] = React.useState<string | null>(null);
  const [imageModalLineId, setImageModalLineId] = React.useState<string | null>(null);
  
  // SoR item remark and picture upload states
  const [sorRemarkModalOpen, setSorRemarkModalOpen] = React.useState<string | null>(null);
  const [sorPictureModalOpen, setSorPictureModalOpen] = React.useState<string | null>(null);
  const [tempRemark, setTempRemark] = React.useState('');

  // Client details state
  const [selectedClientIndex, setSelectedClientIndex] = React.useState<number>(0);
  const [clientDropdownOpen, setClientDropdownOpen] = React.useState(false);
  const [clientDetails, setClientDetails] = React.useState<ClientDetails>(
    EXISTING_CLIENTS[0].details,
  );

  // Email quotation state
  const [sendAsEmail, setSendAsEmail] = React.useState(false);
  const [emailAttachments, setEmailAttachments] = React.useState<LineItemImage[]>([]);

  const remarkInputRef = React.useRef<HTMLTextAreaElement>(null);
  const itemCodeInputRef = React.useRef<HTMLInputElement>(null);
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const validUntilInputRef = React.useRef<HTMLInputElement>(null);

  // Compute Valid Until date as a date string for input
  const computeValidUntilDate = React.useMemo(() => {
    const baseDate = new Date(date + 'T00:00:00');
    if (isNaN(baseDate.getTime())) return '';
    const validDate = new Date(baseDate);
    validDate.setDate(validDate.getDate() + (effectivePeriod || 0));
    return validDate.toISOString().split('T')[0];
  }, [date, effectivePeriod]);

  // Format date for display as dd-mm-yyyy
  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Close remark dropdown when clicking outside
  React.useEffect(() => {
    if (!remarkMenuOpenId) return;
    const handleClickOutside = () => setRemarkMenuOpenId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [remarkMenuOpenId]);

  // Close client dropdown on outside click
  React.useEffect(() => {
    if (!clientDropdownOpen) return;
    const handleClickOutside = () => setClientDropdownOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [clientDropdownOpen]);

  const handleAddLine = () => {
    setLineItems((prev) => [...prev, emptyLineItem()]);
  };

  const handleRemoveLine = (id: string) => {
    setLineItems((prev) => prev.filter((li) => li.id !== id));
  };

  const handleLineChange = (id: string, field: keyof LineItem, value: string) => {
    setLineItems((prev) =>
      prev.map((li) => (li.id === id ? { ...li, [field]: value } : li)),
    );
  };

  const handleRemarkBlur = (id: string) => {
    const li = lineItems.find((l) => l.id === id);
    if (li && !li.remark.trim()) {
      handleLineChange(id, 'remark', '');
    }
    setEditingRemarkId(null);
  };

  const handleStartEditRemark = (id: string) => {
    setEditingRemarkId(id);
    setRemarkMenuOpenId(null);
    setTimeout(() => remarkInputRef.current?.focus(), 0);
  };

  const handleDeleteRemark = (id: string) => {
    handleLineChange(id, 'remark', '');
    setRemarkMenuOpenId(null);
    setEditingRemarkId(null);
  };

  const handleImageUpload = (lineId: string, files: FileList | null) => {
    if (!files) return;
    const lineItem = lineItems.find((li) => li.id === lineId);
    if (!lineItem) return;
    const currentCount = lineItem.images.length;
    const maxAdd = 3 - currentCount;
    if (maxAdd <= 0) return;

    const validFiles = Array.from(files)
      .filter((f) => f.type.startsWith('image/') && f.size <= 2 * 1024 * 1024)
      .slice(0, maxAdd);

    const newImages: LineItemImage[] = validFiles.map((f) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    setLineItems((prev) =>
      prev.map((li) =>
        li.id === lineId ? { ...li, images: [...li.images, ...newImages] } : li,
      ),
    );
    setImageModalLineId(null);
  };

  const handleRemoveImage = (lineId: string, imageId: string) => {
    setLineItems((prev) =>
      prev.map((li) =>
        li.id === lineId
          ? { ...li, images: li.images.filter((img) => img.id !== imageId) }
          : li,
      ),
    );
  };

  const handleSorImageUpload = (itemCode: string, files: FileList | null) => {
    if (!files) return;
    const sorItem = sorLineItems.find((li) => li.itemCode === itemCode);
    if (!sorItem) return;
    const currentCount = sorItem.pictures?.length ?? 0;
    const maxAdd = 3 - currentCount;
    if (maxAdd <= 0) return;

    const validFiles = Array.from(files)
      .filter((f) => f.type.startsWith('image/') && f.size <= 2 * 1024 * 1024)
      .slice(0, maxAdd);

    const newImages = validFiles.map((f) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    const updatedPictures = [...(sorItem.pictures || []), ...newImages];
    updateSorItemPictures(itemCode, updatedPictures);
    setSorPictureModalOpen(null);
  };

  const handleRemoveSorImage = (itemCode: string, imageId: string) => {
    const sorItem = sorLineItems.find((li) => li.itemCode === itemCode);
    if (!sorItem) return;
    const updatedPictures = (sorItem.pictures || []).filter((img) => img.id !== imageId);
    updateSorItemPictures(itemCode, updatedPictures);
  };

  const computeSorTotal = () => {
    return sorLineItems.reduce((sum, li) => {
      return sum + li.rate * li.quantity * (1 + li.markup / 100);
    }, 0);
  };

  const computeCustomTotal = () => {
    return lineItems.reduce((sum, li) => {
      const price = parseFloat(li.rate) || 0;
      const qty = parseInt(li.quantity) || 1;
      return sum + price * qty;
    }, 0);
  };

  const computeTotal = () => {
    return computeSorTotal() + computeCustomTotal();
  };

  // Close transient UI states when drawer closes (form data persists)
  React.useEffect(() => {
    console.log('QuotationSheet open prop changed:', open);
    if (!open) {
      setTermsModalOpen(false);
      setEditingRemarkId(null);
      setRemarkMenuOpenId(null);
      setImageModalLineId(null);
      setEditingItemCodeId(null);
      setClientDropdownOpen(false);
    }
  }, [open]);

  const handleOpenTermsModal = () => {
    setTermsSelection(new Set(terms));
    setTermsModalOpen(true);
  };

  const handleToggleTerm = (term: string) => {
    setTermsSelection((prev) => {
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
    const existing = terms.filter((t) => termsSelection.has(t));
    const added = [...termsSelection].filter((t) => !terms.includes(t));
    setTerms([...existing, ...added]);
    setTermsModalOpen(false);
  };

  const handleRemoveTerm = (term: string) => {
    setTerms((prev) => prev.filter((t) => t !== term));
  };

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
    setClientDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailDocumentUpload = (files: FileList | null) => {
    if (!files) return;
    const validFiles = Array.from(files)
      .filter((f) => f.size <= 5 * 1024 * 1024) // 5MB max
      .slice(0, 5 - emailAttachments.length); // Max 5 files

    const newDocs: LineItemImage[] = validFiles.map((f) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    setEmailAttachments((prev) => [...prev, ...newDocs]);
  };

  const handleRemoveEmailDocument = (docId: string) => {
    setEmailAttachments((prev) => prev.filter((doc) => doc.id !== docId));
  };

  const totalItemsCount = sorLineItems.length + lineItems.length;

  return (
    <div
      className={`h-full bg-white border-l border-gray-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
        open ? 'w-[420px] min-w-[420px]' : 'w-0 min-w-0'
      }`}
    >
      {open && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg text-gray-900">Create Quotation</h2>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          {/* Form body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Company Details */}
            <div>
              <h3 className="text-xs text-gray-500 tracking-wider mb-3" style={{ fontWeight: 600 }}>COMPANY DETAILS</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Company Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Address <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter company address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Registration No <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter registration number"
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* PIC Name */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">PIC Name</label>
                  <input
                    type="text"
                    placeholder="Enter PIC name"
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* PIC Email */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">PIC Email</label>
                  <input
                    type="email"
                    placeholder="Enter PIC email"
                    value={picEmail}
                    onChange={(e) => setPicEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Quotation Details */}
            <div>
              <h3 className="text-xs text-gray-500 tracking-wider mb-3" style={{ fontWeight: 600 }}>QUOTATION DETAILS</h3>
              <div className="space-y-3">
                {/* Quote No + Date row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Quote No <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. 20260303160000"
                      value={quotationNo}
                      onChange={(e) => setQuotationNo(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Date <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <input
                        ref={dateInputRef}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 transition-colors">
                        <span className={`text-sm ${date ? 'text-gray-900' : 'text-gray-400'}`}>
                          {date ? formatDisplayDate(date) : 'Select date'}
                        </span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Effective Period + Valid Until */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Effective Period (Days)</label>
                    <input
                      type="number"
                      value={effectivePeriod}
                      onChange={(e) => setEffectivePeriod(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Valid Until <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <input
                        ref={validUntilInputRef}
                        type="date"
                        value={computeValidUntilDate}
                        readOnly
                        className="absolute inset-0 w-full h-full opacity-0 cursor-default z-10"
                      />
                      <div className="flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg bg-white">
                        <span className="text-sm text-gray-900">
                          {computeValidUntilDate ? formatDisplayDate(computeValidUntilDate) : '—'}
                        </span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reference Number */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Reference Number</label>
                  <input
                    type="text"
                    placeholder="e.g. PO-2026-001"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Client Details */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs text-gray-500 tracking-wider" style={{ fontWeight: 600 }}>CLIENT DETAILS</h3>
                <button
                  onClick={handleClearClient}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Clear client details"
                >
                  <Eraser className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {/* Client Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setClientDropdownOpen(!clientDropdownOpen);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors text-left"
                  >
                    <span className={`text-sm ${selectedClientIndex >= 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {selectedClientIndex >= 0 ? EXISTING_CLIENTS[selectedClientIndex].label : 'Select a client'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {clientDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                      {EXISTING_CLIENTS.map((client, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectClient(index);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                            selectedClientIndex === index
                              ? 'bg-purple-50 text-purple-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {client.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Name + Company row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder="Contact name"
                      value={clientDetails.name}
                      onChange={(e) => handleClientFieldChange('name', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Company <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={clientDetails.company}
                      onChange={(e) => handleClientFieldChange('company', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Address <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="Client address"
                    value={clientDetails.address}
                    onChange={(e) => handleClientFieldChange('address', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    placeholder="Client email"
                    value={clientDetails.email}
                    onChange={(e) => handleClientFieldChange('email', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* Send as Email Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <label className="text-sm text-gray-700">Send Quotation as email</label>
                  <button
                    onClick={() => setSendAsEmail(!sendAsEmail)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      sendAsEmail ? 'bg-purple-600' : 'bg-gray-300'
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
                  <p className="text-xs text-gray-500 mt-2">
                    Quotation and attachments will be emailed to {clientDetails.email}, {picEmail}, demo@cbre.com and buildingadmin@cbre.com
                  </p>
                )}

                {/* Document Dropzone - Only show when toggle is on */}
                {sendAsEmail && (
                  <div className="mt-3">
                    <label className="block text-xs text-gray-700 mb-2">Attach Documents</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
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
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Drop files here or click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">PDF, DOC, XLS, PNG, JPG (max 5MB)</span>
                      </label>
                    </div>

                    {/* Uploaded Documents List */}
                    {emailAttachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {emailAttachments.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Paperclip className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveEmailDocument(doc.id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Terms & Conditions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs text-gray-500 tracking-wider" style={{ fontWeight: 600 }}>TERMS & CONDITIONS</h3>
                <button
                  onClick={handleOpenTermsModal}
                  className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add item
                </button>
              </div>

              {terms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-400 mb-4">No terms added yet</p>
                  <button
                    onClick={handleOpenTermsModal}
                    className="px-4 py-2 text-white rounded-lg text-sm transition-all hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #6366F1 100%)',
                      boxShadow: '0 4px 12px 0 rgba(91, 33, 182, 0.25)',
                    }}
                  >
                    Add T&C items
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {terms.map((term, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <span className="text-xs text-gray-400 mt-0.5 shrink-0">{idx + 1}.</span>
                      <span className="text-sm text-gray-600 flex-1">{term}</span>
                      <button
                        onClick={() => handleRemoveTerm(term)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs text-gray-500 tracking-wider" style={{ fontWeight: 600 }}>ITEMS ({totalItemsCount})</h3>
                <button
                  onClick={handleAddLine}
                  className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add custom item
                </button>
              </div>

              <div className="space-y-3">
                {/* SoR items added from chat */}
                {sorLineItems.map((sor) => (
                  <div
                    key={sor.id}
                    className="p-3 border border-purple-200 rounded-lg bg-purple-50/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-600" style={{ fontWeight: 600 }}>{sor.itemCode}</span>
                      <button
                        onClick={() => removeSorItem(sor.itemCode)}
                        className="p-1 hover:bg-purple-100 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Description</label>
                      <p className="text-sm text-gray-700 leading-relaxed">{sor.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Unit</label>
                        <div className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600">{sor.unit}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Rate (SGD)</label>
                        <div className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600">
                          S$ {sor.rate.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                        <input
                          type="number"
                          min={1}
                          value={sor.quantity}
                          onChange={(e) => updateSorItem(sor.itemCode, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Markup</label>
                        <div className="relative">
                          <input
                            type="number"
                            min={0}
                            value={sor.markup}
                            onChange={(e) => updateSorItem(sor.itemCode, 'markup', Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
                        </div>
                      </div>
                    </div>
                    {/* Remark */}
                    {sor.remark ? (
                      <div className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg bg-white group/remark relative">
                        <span className="text-sm text-gray-600 flex-1 line-clamp-2">{sor.remark}</span>
                        <div className="relative shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSorRemarkModalOpen(sor.itemCode);
                              setTempRemark(sor.remark);
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors opacity-0 group-hover/remark:opacity-100"
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Uploaded image tiles */}
                    {sor.pictures && sor.pictures.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {sor.pictures.map((img) => (
                          <div
                            key={img.id}
                            className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group/img"
                          >
                            <img
                              src={img.url}
                              alt={img.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleRemoveSorImage(sor.itemCode, img.id)}
                              className="absolute top-0.5 right-0.5 p-0.5 bg-black/50 rounded-full text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                      {!sor.remark && editingRemarkId !== sor.itemCode && (
                        <button
                          onClick={() => {
                            setSorRemarkModalOpen(sor.itemCode);
                            setTempRemark('');
                          }}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          Add remark
                        </button>
                      )}
                      <button
                        onClick={() => setSorPictureModalOpen(sor.itemCode)}
                        disabled={(sor.pictures?.length || 0) >= 3}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ImagePlus className="w-3 h-3" />
                        Upload images{(sor.pictures?.length || 0) > 0 ? ` (${sor.pictures.length}/3)` : ''}
                      </button>
                    </div>
                  </div>
                ))}

                {sorLineItems.length === 0 && lineItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <ShoppingCart className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-700 mb-1" style={{ fontWeight: 600 }}>No items yet</p>
                    <p className="text-xs text-gray-400 text-center px-6">Use the chat to search for SOR items and add them to your quotation.</p>
                  </div>
                ) : (
                  lineItems.map((li) => (
                    <div
                      key={li.id}
                      className="p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        {editingItemCodeId === li.id ? (
                          <input
                            ref={itemCodeInputRef}
                            type="text"
                            placeholder="e.g. LI-001"
                            value={li.itemCode}
                            onChange={(e) => handleLineChange(li.id, 'itemCode', e.target.value)}
                            onBlur={() => {
                              if (!li.itemCode.trim()) handleLineChange(li.id, 'itemCode', '');
                              setEditingItemCodeId(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                setEditingItemCodeId(null);
                              }
                            }}
                            className="px-2 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white w-32"
                          />
                        ) : li.itemCode ? (
                          <button
                            onClick={() => {
                              setEditingItemCodeId(li.id);
                              setTimeout(() => itemCodeInputRef.current?.focus(), 0);
                            }}
                            className="text-xs text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            {li.itemCode}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingItemCodeId(li.id);
                              setTimeout(() => itemCodeInputRef.current?.focus(), 0);
                            }}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            Add item code
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveLine(li.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Description</label>
                        <textarea
                          rows={3}
                          placeholder="Description of works"
                          value={li.description}
                          onChange={(e) => handleLineChange(li.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Unit</label>
                          <input
                            type="text"
                            placeholder="e.g. m, m², nr"
                            value={li.unit}
                            onChange={(e) => handleLineChange(li.id, 'unit', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Rate (SGD)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">S$</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              value={li.rate}
                              onChange={(e) => handleLineChange(li.id, 'rate', e.target.value)}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                          <input
                            type="number"
                            min={1}
                            placeholder="1"
                            value={li.quantity}
                            onChange={(e) => handleLineChange(li.id, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      </div>
                      {/* Remark */}
                      {editingRemarkId === li.id ? (
                        <textarea
                          ref={remarkInputRef}
                          rows={2}
                          placeholder="Add a remark..."
                          value={li.remark}
                          onChange={(e) => handleLineChange(li.id, 'remark', e.target.value)}
                          onBlur={() => handleRemarkBlur(li.id)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white resize-none"
                        />
                      ) : li.remark ? (
                        <div className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg bg-white group/remark relative">
                          <span className="text-sm text-gray-600 flex-1 line-clamp-2">{li.remark}</span>
                          <div className="relative shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setRemarkMenuOpenId(remarkMenuOpenId === li.id ? null : li.id);
                              }}
                              className="p-1 hover:bg-gray-100 rounded transition-colors opacity-0 group-hover/remark:opacity-100"
                            >
                              <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </button>
                            {remarkMenuOpenId === li.id && (
                              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartEditRemark(li.id);
                                  }}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteRemark(li.id);
                                  }}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}

                      {/* Uploaded image tiles */}
                      {li.images.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {li.images.map((img) => (
                            <div
                              key={img.id}
                              className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group/img"
                            >
                              <img
                                src={img.url}
                                alt={img.name}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => handleRemoveImage(li.id, img.id)}
                                className="absolute top-0.5 right-0.5 p-0.5 bg-black/50 rounded-full text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action buttons row */}
                      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                        {!li.remark && editingRemarkId !== li.id && (
                          <button
                            onClick={() => handleStartEditRemark(li.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                            Add remark
                          </button>
                        )}
                        <button
                          onClick={() => setImageModalLineId(li.id)}
                          disabled={li.images.length >= 3}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ImagePlus className="w-3 h-3" />
                          Upload images{li.images.length > 0 ? ` (${li.images.length}/3)` : ''}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Notes / Remarks</label>
              <textarea
                rows={3}
                placeholder="Any additional notes or terms..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 space-y-4">
            {/* Pricing summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm text-gray-500">
                  SGD {computeTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">GST (9%)</span>
                <span className="text-sm text-gray-500">
                  SGD {(computeTotal() * 0.09).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900" style={{ fontWeight: 600 }}>Total</span>
                  <span className="text-lg text-purple-600" style={{ fontWeight: 600 }}>
                    SGD {(computeTotal() * 1.09).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
              <div className="flex-1" />
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add chat message with quotation file
                  if (currentChatId) {
                    const fileName = `${quotationNo || 'Quote-123'}.xlsx`;
                    const now = new Date();
                    const timeString = now.toLocaleTimeString('en-SG', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    });
                    
                    const emailMessage = sendAsEmail 
                      ? ` and emailed it to ${clientDetails.email}, ${picEmail}, demo@cbre.com and buildingadmin@cbre.com at ${timeString}`
                      : '';
                    
                    const attachmentText = sendAsEmail ? ' The email includes the quotation and report to run.pdf attachment.' : '';
                    
                    const messageText = `I've generated quotation ${quotationNo || 'Quote-123'}${emailMessage}.${attachmentText} Is there anything else you'd like me to help with?`;
                    
                    // Create thinking steps
                    const steps = [
                      { id: 1, text: 'Generating quotation', status: 'pending' as const },
                    ];
                    
                    if (sendAsEmail) {
                      steps.push({ id: 2, text: 'Sending document as an email', status: 'pending' as const });
                    }
                    
                    const thinkingMessageId = `msg-thinking-${Date.now()}`;
                    
                    // Add thinking message
                    addMessage(currentChatId, {
                      id: thinkingMessageId,
                      text: '',
                      sender: 'ai',
                      timestamp: now,
                      type: 'thinking',
                      thinkingSteps: steps,
                    });
                    
                    // Animate thinking steps
                    setTimeout(() => {
                      updateMessage(currentChatId, thinkingMessageId, {
                        thinkingSteps: steps.map((s, i) => 
                          i === 0 ? { ...s, status: 'active' } : s
                        ),
                      });
                    }, 300);
                    
                    setTimeout(() => {
                      updateMessage(currentChatId, thinkingMessageId, {
                        thinkingSteps: steps.map((s, i) => 
                          i === 0 ? { ...s, status: 'complete' } : i === 1 ? { ...s, status: 'active' } : s
                        ),
                      });
                    }, 1200);
                    
                    const finalDelay = sendAsEmail ? 2100 : 1200;
                    
                    setTimeout(() => {
                      if (sendAsEmail) {
                        updateMessage(currentChatId, thinkingMessageId, {
                          thinkingSteps: steps.map(s => ({ ...s, status: 'complete' as const })),
                        });
                      }
                      
                      // Add final response after a short delay
                      setTimeout(() => {
                        addMessage(currentChatId, {
                          id: `msg-${Date.now()}`,
                          text: messageText,
                          sender: 'ai',
                          timestamp: new Date(),
                          attachedFile: fileName,
                        });
                      }, 300);
                    }, finalDelay);
                  }
                  onClose();
                }}
                className="px-5 py-2.5 text-white rounded-full text-sm transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #6366F1 100%)',
                  boxShadow: '0 4px 12px 0 rgba(91, 33, 182, 0.25)',
                }}
              >
                Generate
              </button>
            </div>
          </div>

          {/* Terms & Conditions Modal */}
          {termsModalOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 z-[60]"
                onClick={() => setTermsModalOpen(false)}
              />
              <div className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl">
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="text-base text-gray-900">Select Terms & Conditions</h3>
                  <button
                    onClick={() => setTermsModalOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Checkbox list */}
                <div className="px-6 py-4 max-h-[360px] overflow-y-auto space-y-1">
                  {STANDARD_TERMS.map((term) => {
                    const isChecked = termsSelection.has(term);
                    return (
                      <label
                        key={term}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          isChecked ? 'bg-purple-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-purple-600 border-purple-600'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => handleToggleTerm(term)}
                        />
                        <span className="text-sm text-gray-700">{term}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Modal footer */}
                <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={() => setTermsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTerms}
                    className="flex-1 px-4 py-2.5 text-white rounded-xl text-sm transition-all hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #6366F1 100%)',
                      boxShadow: '0 4px 12px 0 rgba(91, 33, 182, 0.25)',
                    }}
                  >
                    Add to Quotation
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Image Upload Modal */}
          {imageModalLineId && (() => {
            const targetLine = lineItems.find((li) => li.id === imageModalLineId);
            const currentCount = targetLine?.images.length ?? 0;
            const remaining = 3 - currentCount;
            const fileInputRef = React.createRef<HTMLInputElement>();

            return (
              <>
                <div
                  className="fixed inset-0 bg-black/40 z-[60]"
                  onClick={() => setImageModalLineId(null)}
                />
                <div className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-2xl">
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-base text-gray-900">Upload Images</h3>
                    <button
                      onClick={() => setImageModalLineId(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Dropzone */}
                  <div className="px-6 py-6">
                    <div
                      className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-purple-400 hover:bg-purple-50/30 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleImageUpload(imageModalLineId, e.dataTransfer.files);
                      }}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-gray-400">
                        Max {remaining} photo{remaining !== 1 ? 's' : ''}, 2MB each
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImageUpload(imageModalLineId, e.target.files)}
                    />
                  </div>

                  {/* Modal footer */}
                  <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={() => setImageModalLineId(null)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            );
          })()}

          {/* SoR Item Remark Modal */}
          {sorRemarkModalOpen && (() => {
            const targetItem = sorLineItems.find((li) => li.itemCode === sorRemarkModalOpen);
            const fileInputRef = React.createRef<HTMLInputElement>();

            return (
              <>
                <div
                  className="fixed inset-0 bg-black/40 z-[60]"
                  onClick={() => setSorRemarkModalOpen(null)}
                />
                <div className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-2xl">
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-base text-gray-900">Add Remark for {targetItem?.itemCode}</h3>
                    <button
                      onClick={() => setSorRemarkModalOpen(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Remark input */}
                  <div className="px-6 py-6">
                    <textarea
                      ref={fileInputRef}
                      rows={4}
                      placeholder="Enter remark..."
                      value={tempRemark}
                      onChange={(e) => setTempRemark(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white resize-none"
                    />
                  </div>

                  {/* Modal footer */}
                  <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={() => setSorRemarkModalOpen(null)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (targetItem) {
                          updateSorItemRemark(targetItem.itemCode, tempRemark);
                        }
                        setSorRemarkModalOpen(null);
                      }}
                      className="flex-1 px-4 py-2.5 text-white rounded-xl text-sm transition-all hover:shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #6366F1 100%)',
                        boxShadow: '0 4px 12px 0 rgba(91, 33, 182, 0.25)',
                      }}
                    >
                      Add Remark
                    </button>
                  </div>
                </div>
              </>
            );
          })()}

          {/* SoR Item Picture Upload Modal */}
          {sorPictureModalOpen && (() => {
            const targetItem = sorLineItems.find((li) => li.itemCode === sorPictureModalOpen);
            const currentCount = targetItem?.pictures?.length ?? 0;
            const remaining = 3 - currentCount;
            const fileInputRef = React.createRef<HTMLInputElement>();

            return (
              <>
                <div
                  className="fixed inset-0 bg-black/40 z-[60]"
                  onClick={() => setSorPictureModalOpen(null)}
                />
                <div className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-2xl">
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-base text-gray-900">Upload Images for {targetItem?.itemCode}</h3>
                    <button
                      onClick={() => setSorPictureModalOpen(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Dropzone */}
                  <div className="px-6 py-6">
                    <div
                      className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-purple-400 hover:bg-purple-50/30 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSorImageUpload(sorPictureModalOpen, e.dataTransfer.files);
                      }}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-gray-400">
                        Max {remaining} photo{remaining !== 1 ? 's' : ''}, 2MB each
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleSorImageUpload(sorPictureModalOpen, e.target.files)}
                    />
                  </div>

                  {/* Modal footer */}
                  <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={() => setSorPictureModalOpen(null)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
};