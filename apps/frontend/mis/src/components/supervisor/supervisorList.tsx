"use client";
import { UserPlus, Users } from "lucide-react";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";
import { SupervisorListItem } from "@/lib/types";

export function SupervisorList() {
  const router = useRouter();
  const [supervisors, setSupervisors] = useState<SupervisorListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.supervisors.$get();
        if (!response.ok) throw new Error("Failed to fetch supervisors");
        const data = await response.json();
        setSupervisors(data);
      } catch {
        toast.error("فشل في تحميل قائمة المشرفين");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-screen">
          <Loader className="w-20 h-20" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              <Users className="text-yellow-500" />
              قائمة المشرفين
            </CardTitle>
            <Link href="/dashboard/supervisors/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                إضافة مشرف
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table dir="rtl">
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-right">اسم المشرف</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supervisors.length === 0 && (
                  <TableRow className="border-b h-12">
                    <TableCell colSpan={2} className="text-center">
                      لا يوجد مشرفين
                    </TableCell>
                  </TableRow>
                )}
                {supervisors.map((supervisor, index) => (
                  <TableRow
                    onClick={() => router.push(`/dashboard/supervisors/${supervisor.supervisorId}`)}
                    key={supervisor.supervisorId}
                    className={`border-b h-12 cursor-pointer ${index % 2 !== 0 ? "bg-white" : "bg-blue-50"}`}
                  >
                    <TableCell className="w-[50%]">{supervisor.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
