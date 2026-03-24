import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import {
  FileImage,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";
import { toast } from "sonner";
import PdfIcon from "../../imports/PdfIcon";
import ExcelIcon from "../../imports/ExcelIcon";
import ImgFillLight from "../../imports/ImgFillLight";
import WordIcon from "../../imports/WordIcon";
import { useAppContext } from "../context";
import type { FileData, FileStatus, Building, Category } from "../types";

const mockFiles: FileData[] = [
  {
    id: "1",
    fileName: "Building_Maintenance_Report_Q1.pdf",
    fileType: "document",
    status: "processed",
    building: "The Gear",
    category: "Operations",
    uploadTime: "2024-02-20 14:30",
    uploadedBy: "John Smith",
  },
  {
    id: "2",
    fileName: "Energy_Consumption_Data.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "Raffles City Tower",
    category: "Sirius",
    uploadTime: "2024-02-20 13:15",
    uploadedBy: "Sarah Johnson",
  },
  {
    id: "3",
    fileName: "HVAC_System_Layout.png",
    fileType: "image",
    status: "error",
    building: "Marina Bay Sands Tower 1",
    category: "HVAC",
    uploadTime: "2024-02-20 12:45",
    uploadedBy: "Michael Chen",
  },
  {
    id: "4",
    fileName: "Inspection_Checklist_Feb.pdf",
    fileType: "document",
    status: "processed",
    building: "The Gear",
    category: "Operations",
    uploadTime: "2024-02-20 11:20",
    uploadedBy: "Emily Wong",
  },
  {
    id: "5",
    fileName: "Tenant_Feedback_Survey.xlsx",
    fileType: "spreadsheet",
    status: "error",
    building: "Marina Bay Sands Tower 2",
    category: "HR-Certificate",
    uploadTime: "2024-02-20 10:30",
    uploadedBy: "David Lim",
  },
  {
    id: "6",
    fileName: "Fire_Safety_Report.pdf",
    fileType: "document",
    status: "processed",
    building: "Raffles City Tower",
    category: "HVAC",
    uploadTime: "2024-02-19 16:45",
    uploadedBy: "Lisa Tan",
  },
  {
    id: "7",
    fileName: "Water_Usage_Analytics.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Sirius",
    uploadTime: "2024-02-19 15:30",
    uploadedBy: "Robert Ng",
  },
  {
    id: "8",
    fileName: "Building_Blueprint_Level_5.png",
    fileType: "image",
    status: "processed",
    building: "Marina Bay Sands Tower 1",
    category: "HVAC",
    uploadTime: "2024-02-19 14:10",
    uploadedBy: "Amanda Lee",
  },
  {
    id: "9",
    fileName: "Schedule_of_Rates_2022.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Schedule of Rates",
    uploadTime: "2022-12-15 09:00",
    uploadedBy: "Charlie Tan",
  },
  {
    id: "10",
    fileName: "Schedule_of_Rates_2023.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Schedule of Rates",
    uploadTime: "2023-12-15 09:00",
    uploadedBy: "Charlie Tan",
  },
  {
    id: "11",
    fileName: "Schedule_of_Rates_2024.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Schedule of Rates",
    uploadTime: "2024-12-15 09:00",
    uploadedBy: "Charlie Tan",
  },
  {
    id: "12",
    fileName: "Schedule_of_Rates_2025.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Schedule of Rates",
    uploadTime: "2025-12-15 09:00",
    uploadedBy: "Charlie Tan",
  },
  {
    id: "13",
    fileName: "Schedule_of_Rates_2026.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Schedule of Rates",
    uploadTime: "2026-02-15 09:00",
    uploadedBy: "Charlie Tan",
  },
  {
    id: "14",
    fileName: "Quotation_0123.xlsx",
    fileType: "spreadsheet",
    status: "processed",
    building: "The Gear",
    category: "Schedule of Rates",
    uploadTime: "2026-02-23 11:30",
    uploadedBy: "Charlie Tan",
  },
];

export function Documents() {
  const { uploadedFiles } = useAppContext();
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [buildingFilter, setBuildingFilter] = useState<Set<Building>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<Set<Category>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Merge uploaded files with mock files
  const allFiles = useMemo(() => {
    return [...uploadedFiles, ...mockFiles];
  }, [uploadedFiles]);

  const filteredFiles = useMemo(() => {
    return allFiles.filter((file) => {
      const matchesSearch = file.fileName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || file.status === statusFilter;
      const matchesBuilding =
        buildingFilter.size === 0 || buildingFilter.has(file.building);
      const matchesCategory =
        categoryFilter.size === 0 || categoryFilter.has(file.category);
      return matchesSearch && matchesStatus && matchesBuilding && matchesCategory;
    });
  }, [allFiles, searchQuery, statusFilter, buildingFilter, categoryFilter]);

  const paginatedFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredFiles.slice(startIndex, endIndex);
  }, [filteredFiles, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  // Reset to page 1 when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  const toggleAllFiles = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map((f) => f.id)));
    }
  };

  const getFileIcon = (fileType: string, status?: FileStatus) => {
    // Show loader for uploading files
    if (status === "uploading") {
      return <Loader2 className="size-5 animate-spin text-[#3C3DEC]" />;
    }

    switch (fileType) {
      case "document":
        return (
          <div className="size-5">
            <PdfIcon />
          </div>
        );
      case "spreadsheet":
        return (
          <div className="size-5">
            <ExcelIcon />
          </div>
        );
      case "word":
        return (
          <div className="size-5">
            <WordIcon />
          </div>
        );
      case "image":
        return (
          <div className="size-5">
            <ImgFillLight />
          </div>
        );
      default:
        return (
          <div className="size-5">
            <FileImage />
          </div>
        );
    }
  };

  const getStatusIcon = (status: FileStatus) => {
    if (status === "uploading") {
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 pointer-events-none">
          Uploading...
        </Badge>
      );
    } else if (status === "processed") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 pointer-events-none">
          Processed
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 pointer-events-none">
          Error
        </Badge>
      );
    }
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    resetPagination();
  };

  const handleBuildingFilter = (value: Building) => {
    setBuildingFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
    resetPagination();
  };

  const handleCategoryFilter = (value: Category) => {
    setCategoryFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
    resetPagination();
  };

  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [buildingFilterOpen, setBuildingFilterOpen] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteFiles = () => {
    // Get the selected file names
    const filesToDelete = mockFiles.filter(file => selectedFiles.has(file.id));
    const failedFile = filesToDelete.find(file => file.fileName === 'Fire_Safety_Report.pdf');
    
    // Simulate deletion
    if (failedFile) {
      const successCount = filesToDelete.length - 1;
      toast.error(`${successCount} ${successCount === 1 ? 'file' : 'files'} deleted successfully except ${failedFile.fileName}. Please try again.`);
    } else {
      toast.success("Files deleted successfully!");
    }
    
    setSelectedFiles(new Set());
    setDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Scholar files</h1>
        <p className="text-sm text-muted-foreground">
          Manage and view all your uploaded documents
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Filter files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />

        {/* Filters */}
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <Popover open={statusFilterOpen} onOpenChange={setStatusFilterOpen}>
            <PopoverTrigger asChild>
              {statusFilter === 'all' ? (
                <Button 
                  variant="ghost" 
                  className="h-8 px-3 rounded-full border border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-normal"
                >
                  Status
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  className="h-8 px-3 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-100 text-sm font-normal"
                >
                  {statusFilter === 'processed' ? (
                    <>
                      <CheckCircle2 className="size-4 text-green-600" />
                      Processed
                    </>
                  ) : (
                    <>
                      <XCircle className="size-4 text-red-600" />
                      Error
                    </>
                  )}
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-2">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    handleStatusFilter('all');
                    setStatusFilterOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent outline-none text-left",
                    statusFilter === 'all' && "bg-accent"
                  )}
                >
                  <span>All</span>
                </button>
                <button
                  onClick={() => {
                    handleStatusFilter('processed');
                    setStatusFilterOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent outline-none text-left",
                    statusFilter === 'processed' && "bg-accent"
                  )}
                >
                  <CheckCircle2 className="size-4 text-green-600" />
                  <span>Processed</span>
                </button>
                <button
                  onClick={() => {
                    handleStatusFilter('error');
                    setStatusFilterOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent outline-none text-left",
                    statusFilter === 'error' && "bg-accent"
                  )}
                >
                  <XCircle className="size-4 text-red-600" />
                  <span>Error</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Building Filter */}
          <Popover open={buildingFilterOpen} onOpenChange={setBuildingFilterOpen}>
            <PopoverTrigger asChild>
              {buildingFilter.size === 0 ? (
                <Button 
                  variant="ghost" 
                  className="h-8 px-3 rounded-full border border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-normal"
                >
                  Building
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  className="h-8 px-3 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-100 text-sm font-normal"
                >
                  Building ({buildingFilter.size})
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56 p-2">
              <div className="flex flex-col gap-1">
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={buildingFilter.has('The Gear')}
                    onCheckedChange={() => handleBuildingFilter('The Gear' as Building)}
                  />
                  <span>The Gear</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={buildingFilter.has('Raffles City Tower')}
                    onCheckedChange={() => handleBuildingFilter('Raffles City Tower' as Building)}
                  />
                  <span>Raffles City Tower</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={buildingFilter.has('Marina Bay Sands Tower 1')}
                    onCheckedChange={() => handleBuildingFilter('Marina Bay Sands Tower 1' as Building)}
                  />
                  <span>Marina Bay Sands Tower 1</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={buildingFilter.has('Marina Bay Sands Tower 2')}
                    onCheckedChange={() => handleBuildingFilter('Marina Bay Sands Tower 2' as Building)}
                  />
                  <span>Marina Bay Sands Tower 2</span>
                </label>
              </div>
            </PopoverContent>
          </Popover>

          {/* Category Filter */}
          <Popover open={categoryFilterOpen} onOpenChange={setCategoryFilterOpen}>
            <PopoverTrigger asChild>
              {categoryFilter.size === 0 ? (
                <Button 
                  variant="ghost" 
                  className="h-8 px-3 rounded-full border border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-normal"
                >
                  Category
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  className="h-8 px-3 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-100 text-sm font-normal"
                >
                  Category ({categoryFilter.size})
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-2">
              <div className="flex flex-col gap-1">
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={categoryFilter.has('Operations')}
                    onCheckedChange={() => handleCategoryFilter('Operations' as Category)}
                  />
                  <span>Operations</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={categoryFilter.has('HR-Certificate')}
                    onCheckedChange={() => handleCategoryFilter('HR-Certificate' as Category)}
                  />
                  <span>HR-Certificate</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={categoryFilter.has('Schedule of Rates')}
                    onCheckedChange={() => handleCategoryFilter('Schedule of Rates' as Category)}
                  />
                  <span>Schedule of Rates</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={categoryFilter.has('Sirius')}
                    onCheckedChange={() => handleCategoryFilter('Sirius' as Category)}
                  />
                  <span>Sirius</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={categoryFilter.has('HVAC')}
                    onCheckedChange={() => handleCategoryFilter('HVAC' as Category)}
                  />
                  <span>HVAC</span>
                </label>
                <label
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer"
                >
                  <Checkbox 
                    checked={categoryFilter.has('SOP')}
                    onCheckedChange={() => handleCategoryFilter('SOP' as Category)}
                  />
                  <span>SOP</span>
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="ml-auto">
          {selectedFiles.size > 0 ? (
            <Button 
              variant="destructive"
              onClick={() => {
                // Handle delete action
                setDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="size-4 mr-2" />
              Delete ({selectedFiles.size})
            </Button>
          ) : (
            <Button className="bg-[#3C3DEC] hover:bg-[#3C3DEC]/90">
              <Plus className="size-4" />
              Upload File
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    filteredFiles.length > 0 &&
                    selectedFiles.size === filteredFiles.length
                  }
                  onCheckedChange={toggleAllFiles}
                />
              </TableHead>
              <TableHead>File</TableHead>
              <TableHead>Building</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Upload Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No files found
                </TableCell>
              </TableRow>
            ) : (
              paginatedFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedFiles.has(file.id)}
                      onCheckedChange={() => toggleFileSelection(file.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.fileType, file.status)}
                      <span className="font-medium">{file.fileName}</span>
                      {getStatusIcon(file.status)}
                    </div>
                  </TableCell>
                  <TableCell>{file.building}</TableCell>
                  <TableCell>{file.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{file.uploadTime}</span>
                      <span className="text-xs text-muted-foreground">
                        {file.uploadedBy}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredFiles.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredFiles.length)} of {filteredFiles.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || filteredFiles.length === 0}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[512px] p-0">
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader className="text-left p-0 gap-2">
              <DialogTitle className="text-[#0f172a] text-[18px] font-semibold leading-[28px]">
                You are about to delete {selectedFiles.size} {selectedFiles.size === 1 ? 'file' : 'files'}
              </DialogTitle>
              <DialogDescription className="text-[#64748b] text-[14px] leading-[20px]">
                This action cannot be undone. This will permanently delete your files.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="p-0 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 border-[#e2e8f0]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDeleteFiles}
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#0f172a]/90"
              >
                Continue
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}