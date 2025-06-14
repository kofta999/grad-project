import { Filter, ChevronRight, ChevronLeft, Check, Scroll } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/ui/search";
import { Loader } from "@/components/ui/loader";
import { useDebounce } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type ApplicationsListResponse = InferResponseType<typeof apiClient.applications.$get>;
type ApplicationsData = ApplicationsListResponse["data"];
type Pagination = ApplicationsListResponse["pagination"];
const DEBOUNCE_LENGTH = 500;

export default function ApplicationsList({
  applicationsResponse,
  setApplicationsResponse,
  getApplicationsList,
}: {
  applicationsResponse: ApplicationsListResponse;
  setApplicationsResponse: (applications: ApplicationsListResponse) => void;
  getApplicationsList: (
    nameAr: string,
    page: number,
    status: string | undefined,
    sortName: string | undefined
  ) => Promise<void>;
}) {
  const router = useRouter();
  const DEGREE_MAP: Record<ApplicationsData[number]["academicDegree"], string> = {
    diploma: "دبلوم",
    master: "ماجستير",
    phd: "دكتوراه",
  };
  const [nameAr, setNameAr] = useState<string>("");
  const [debouncedName] = useDebounce(nameAr, DEBOUNCE_LENGTH);
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [sortName, setSortName] = useState<string | undefined>(undefined);
  const [loader, setLoader] = useState<boolean>(false);
  const { data } = applicationsResponse;

  const handleAcceptApplication = async (applicationId: number) => {
    try {
      const res = await apiClient.applications.accept.$post({
        json: { applicationId },
      });
      if (res.status === 200) {
        setApplicationsResponse({
          ...applicationsResponse,
          data: applicationsResponse.data.map((app) =>
            app.applicationId === applicationId ? { ...app, status: "accepted" } : app
          ),
        });
        toast.success(`تم قبول طلب الطالب ذو الرقم ${applicationId}.`);
      }
    } catch (err) {
      console.error("Failed to accept application:", err);
      toast.error("فشل في قبول الطلب. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleRejectApplication = async (applicationId: number) => {
    try {
      const res = await apiClient.applications.reject.$post({
        json: { applicationId },
      });
      if (res.status === 200) {
        setApplicationsResponse({
          ...applicationsResponse,
          data: applicationsResponse.data.map((app) =>
            app.applicationId === applicationId ? { ...app, status: "rejected" } : app
          ),
        });
        toast.success(`تم رفض طلب الطالب ذو الرقم ${applicationId}.`);
      }
    } catch (err) {
      console.error("Failed to accept application:", err);
      toast.error("فشل في رفض الطلب. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleSearch = (value: string) => {
    setPage(1);
    setNameAr(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await getApplicationsList(debouncedName, page, status, sortName);
      setLoader(false);
    };

    fetchData();
  }, [debouncedName, page, status, sortName]);

  return (
    <Container>
      <Card>
        <SearchBar
          placeholder="ابحث هنا..."
          onChange={(value) => handleSearch(value as string)}
          className=""
        />
      </Card>
      {loader ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <Loader className="w-20 h-20" />
          </div>
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                <Scroll className="text-yellow-500" />
                تقديمات الطلاب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-100 px-4 py-2 rounded-md text-sm w-fit">
                  <Filter />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 text-right">
                  <DropdownMenuLabel className="font-bold text-md">حسب الحالة</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => setStatus(undefined)}>
                    الكل {status === undefined && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setStatus("accepted")}>
                    مقبول {status === "accepted" && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setStatus("pending")}>
                    تحت المراجعة {status === "pending" && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setStatus("rejected")}>
                    مرفوض {status === "rejected" && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="font-bold text-md">حسب الأبجدية</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => setSortName("asc")}>
                    من أ إلى ي {sortName === "asc" && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortName("desc")}>
                    من ي إلى أ {sortName === "desc" && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="overflow-x-auto">
                <Table dir="rtl">
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="text-right">اسم الطالب</TableHead>
                      <TableHead className="text-right">الدرجة العلمية</TableHead>
                      <TableHead className="text-right">البرنامج الأكاديمي</TableHead>
                      <TableHead className="text-center">حالة الطالب</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.length === 0 && (
                      <TableRow className="border-b h-12">
                        <TableCell colSpan={4} className="text-center">
                          لا يوجد طلاب
                        </TableCell>
                      </TableRow>
                    )}
                    {data &&
                      data.map((application, index) => (
                        <TableRow
                          onClick={() =>
                            router.push(`/dashboard/applications/${application.applicationId}`)
                          }
                          key={application.applicationId}
                          className={`border-b h-12 cursor-pointer ${index % 2 !== 0 ? "bg-white" : "bg-blue-50"}`}
                        >
                          <TableCell className="w-[20%]">{application.studentName}</TableCell>
                          <TableCell className="w-[15%]">
                            {DEGREE_MAP[application.academicDegree]}
                          </TableCell>
                          <TableCell className="w-[50%]">{application.department}</TableCell>
                          <TableCell className="w-[15%]">
                            {application.status === "accepted" && (
                              <p
                                className={`h-10 flex items-center justify-center py-1 px-2 text-sm rounded w-full transition-colors duration-200 bg-mainColor text-white cursor-not-allowed`}
                              >
                                مقبول
                              </p>
                            )}
                            {application.status === "pending" && (
                              <div className="flex gap-2 justify-between items-center">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAcceptApplication(application.applicationId);
                                  }}
                                  disabled={application.status !== "pending"}
                                  className={`py-1 px-2 text-sm rounded w-full text-center transition-colors duration-200 bg-green-600 hover:bg-green-700 text-white cursor-pointer`}
                                >
                                  قبول
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRejectApplication(application.applicationId);
                                  }}
                                  disabled={application.status !== "pending"}
                                  className={`h-10 py-1 px-2 text-sm rounded w-full text-center transition-colors duration-200 bg-red-600 hover:bg-red-700 text-white cursor-pointer`}
                                >
                                  رفض
                                </Button>
                              </div>
                            )}
                            {application.status === "rejected" && (
                              <p
                                className={`h-10 flex items-center justify-center py-1 px-2 text-sm rounded w-full transition-colors duration-200 bg-red-600 hover:bg-red-700 text-white cursor-not-allowed`}
                              >
                                مرفوض
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  variant="outline"
                  size="sm"
                  disabled={page === 1 || !applicationsResponse?.pagination?.hasPreviousPage}
                >
                  <ChevronRight className="h-4 w-4 ml-1" />
                  <p className="hidden sm:block">الصفحة السابقة</p>
                </Button>

                <div className="text-sm text-gray-600">
                  الصفحة {applicationsResponse?.pagination?.currentPage} من{" "}
                  {applicationsResponse?.pagination?.totalPages}
                </div>

                <Button
                  onClick={() => setPage(page + 1)}
                  variant="outline"
                  size="sm"
                  disabled={!applicationsResponse?.pagination?.hasNextPage}
                >
                  <p className="hidden sm:block">الصفحة التالية</p>
                  <ChevronLeft className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}
