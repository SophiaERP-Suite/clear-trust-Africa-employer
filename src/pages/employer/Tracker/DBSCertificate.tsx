import { CheckCircle, ChevronRightIcon, Download, ShieldCheck } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast, ToastContainer } from "react-toastify";
import Hashids from "hashids";
import { useEffect, useState } from "react";
import { getDBSCertificateByApplicationId } from "../../../utils/Requests/DbsRequestActions";

type NIMCRecord = {
  nin: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  residentialAddress: string;
  state: string;
  lga: string;
  nationality: string;
};
 
type NPFCriminalRecord = {
  offenseType: string;
  offenseCategory: '1' | '2';
  caseStatus: '1' | '2' | '3' | '4';
  arrestDate: string;
  courtName?: string;
};
 
type NPFProfile = {
  hasCriminalRecord: boolean;
  wanted: boolean;
  riskLevel: '0' | '1' | '2' | '3';
  records: NPFCriminalRecord[];
};

type DBSCertificate = {
  dbsCertificateNo: number,
  dbsTypeName: string,
  dbsApplicationId: number,
  logoUrl: string;
  countryId: number,
  dbsCertificateId: number,
  dateCreated: string,
}

const riskLevels: Record<number, string> = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: 'High'
}
 
const Badge = ({ text, bgColor, textColor }: { text: string; bgColor: string; textColor: string; }) => (
  <div
    className={`px-3 rounded-md text-sm font-medium flex items-center h-8`}
    style={{ backgroundColor: `${bgColor}`, color: `${textColor}`}}
  >
    {text}
  </div>
);
 

export default function DBSCertificate() {
    const { id } = useParams();
    const hashIds = new Hashids('ClearTrustAfricaEncode', 10);
    const hashedId = id ? Number(hashIds.decode(id)[0]) : 0;
    const certificateNumber = 'CTA-32-130126-001290';
    const [certificate, setCertificate] = useState<DBSCertificate | null>(null);
    const [identity, setIdentity] = useState<NIMCRecord | null>(null);
    const [profile, setProfile] = useState<NPFProfile | null>(null);
    const [records, setRecords] = useState<NPFCriminalRecord[]>([]);

    useEffect(() => {
        getDBSCertificateByApplicationId(hashedId)
        .then(res => {
        if (res.status === 200) {
            res.json()
            .then(data => {
                console.log(data);
                setCertificate(data.data.certificate);
                setIdentity(data.data.identity);
                setProfile(data.data.profile);
                setRecords(data.data.records);
            })
        } else {
            res.text()
            .then(data => {
                console.log(JSON.parse(data));
            })
        }
        })
        .catch((err) => console.log(err))
    }, [hashedId]);

    const downloadCertificate = async () => {
        const loader = document.getElementById('query-loader');
        const text = document.getElementById('query-text');
        if (loader) {
            loader.style.display = 'flex';
        }
        if (text) {
            text.style.display = 'none';
        }
        try {
            const element = document.getElementById('cta-certificate');
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#fff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [794, 1123],
            });
            pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
            pdf.save(`${certificateNumber}.pdf`);
            toast.success('Your file is being downloaded');
        } catch (err) {
            toast.warning("Download Failed");
            console.log(err);
        }
        if (loader) {
            loader.style.display = 'none';
        }
        if (text) {
            text.style.display = 'flex';
        }
    }

    return (
        <div
            className="p-6 lg:p-8 footer-inner mx-auto main-container container"
            x-bind:className="setting.page_layout"
            >
            <ToastContainer />
            <div className="flex flex-wrap mb-8 items-center justify-between">
                <div className="flex">
                    <ShieldCheck className="text-blue-600 mr-2" size={36} />
                    <div>
                        <h3 className="mb-0 text-black">
                            CT Certificate
                        </h3>
                        <p className="text-secondary-600 text-black">
                            <NavLink to="/Dashboard">Dashboard</NavLink>{" "}
                            <ChevronRightIcon size={14} />{" "}
                            <NavLink to="/Tracker">CT Tracker</NavLink>{" "}
                            <ChevronRightIcon size={14} />{" "}
                            <NavLink to={`/Tracker/${id}`}>CT Details</NavLink>{" "}
                            <ChevronRightIcon size={14} />{" "}
                            <NavLink to={`/Tracker/Certificate/${id}`}>Certificate</NavLink>{" "}
                        </p>
                    </div>
                </div>
                <button className="btn btn-success mr-2 mb-2" onClick={() => downloadCertificate()}>
                    <div className="dots hidden" id="query-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span id="query-text">
                        <Download size={18} className="mr-2" />
                        Download Certificate
                    </span>
                </button>
            </div>
            {
                certificate && identity && profile && (
                    <div className="overflow-x-auto flex justify-center">
                        <div className="py-2 rounded-lg shadow-lg w-[794px] h-[1123px] min-w-[794px] relative" id="cta-certificate" style={{ backgroundColor: 'rgb(255, 255, 255)'}}>
                            <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10"
                                style={{
                                    backgroundImage: "url('http://localhost:5173/xt/cta_adm/cleartrust_logo_mini.png')"
                                }}
                            />
                            <div className="space-y-8 relative z-10">
                        
                                {/* Header */}
                                <div className="p-4 flex justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={certificate.logoUrl ?? "http://localhost:5173/xt/cta_adm/coat_of_arms.jpg"}
                                            className="w-30 h-30 border-4 border-white rounded-full mr-4"
                                            style={{ objectFit: "cover" }}
                                            alt="profile-image"
                                        />
                                        <div>
                                            <h1 className="text-2xl font-semibold" style={{ color: 'rgb(31, 41, 55)'}}>
                                                {certificate.dbsTypeName}
                                            </h1>
                                            <p className="text-sm">Certificate No: {certificate.dbsCertificateNo}</p>
                                        </div>
                                    </div>
                                    <div className="max-w-[180px] border-l pl-4 pt-2 items-center">
                                        <CheckCircle size={40} className="mr-2" style={{ color: 'rgb(4, 120, 87)'}} />
                                        <h1 className="text-xl" style={{ color: 'rgb(31, 41, 55)'}}>
                                            CLEAR TRUST AFRICA
                                        </h1>
                                        <p className="text-xs">Generated: {(new Date(certificate.dateCreated)).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
                                    </div>
                                </div>
                        
                                {/* IDENTITY SECTION */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'rgb(31, 41, 55)'}}>
                                        Identity Information
                                    </h2>
                            
                                    <div className="grid grid-cols-2 gap-6 text-sm">
                                        <div><strong>NIN:</strong> {identity.nin}</div>
                                        <div><strong>Name:</strong> {identity.firstName} {identity.lastName}</div>
                                        <div><strong>Other Names:</strong> {identity.otherNames}</div>
                                        <div><strong>Date of Birth:</strong> {(new Date(identity.dateOfBirth)).toLocaleDateString('en-GB').replace(/\//g, '-')}</div>
                                        <div><strong>Gender:</strong> {identity.gender}</div>
                                        <div><strong>Phone:</strong> {identity.phone}</div>
                                        <div><strong>Email:</strong> {identity.email}</div>
                                        <div><strong>Nationality:</strong> {identity.nationality}</div>
                                        <div><strong>State:</strong> {identity.state}</div>
                                        <div><strong>LGA:</strong> {identity.lga}</div>
                                        <div className="md:col-span-2">
                                            <strong>Residential Address:</strong> {identity.residentialAddress}
                                        </div>
                                    </div>
                                </div>

                                {/* RECORDS SECTION */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'rgb(31, 41, 55)'}}>
                                        Criminal & Incident Records
                                    </h2>
                            
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <Badge
                                        text={profile.hasCriminalRecord ? 'Criminal Record Found' : 'No Criminal Record'}
                                        bgColor={profile.hasCriminalRecord? 'rgb(254, 226, 226)': 'rgb(209, 250, 229)'}
                                        textColor={profile.hasCriminalRecord? 'rgb(185, 28, 28)': 'rgb(4, 120, 87)'}
                                        />
                                        <Badge
                                        text={profile.wanted ? 'Wanted' : 'Not Wanted'}
                                        bgColor={profile.wanted? 'rgb(254, 226, 226)': 'rgb(209, 250, 229)'}
                                        textColor={profile.wanted? 'rgb(185, 28, 28)': 'rgb(4, 120, 87)'}
                                        />
                                        <Badge
                                        text={`Risk Level: ${riskLevels[profile.riskLevel]}`}
                                        bgColor={
                                            profile.riskLevel == '3'
                                                ? 'rgb(254, 226, 226)'
                                                : profile.riskLevel == '2'
                                                ? 'rgb(255, 247, 219)'
                                                : profile.riskLevel == '1'
                                                ? 'rgb(254, 243, 199)'
                                                : 'rgb(209, 250, 229)'
                                        }
                                        textColor={
                                            profile.riskLevel == '3'
                                                ? 'rgb(185, 28, 28)'
                                                : profile.riskLevel == '2'
                                                ? 'rgb(234, 80, 12)'
                                                : profile.riskLevel == '1'
                                                ? 'rgb(180, 83, 9)'
                                                : 'rgb(4, 120, 87)'
                                        }
                                        />
                                    </div>

                                    {records.length > 0 && (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm border rounded" style={{ borderColor: 'rgb(229, 231, 235)'}}>
                                                <thead style={{ backgroundColor: 'rgb(243, 244, 246)'}}>
                                                <tr>
                                                    <th className="p-3 text-left">Offense</th>
                                                    <th className="p-3 text-left">Category</th>
                                                    <th className="p-3 text-left">Status</th>
                                                    <th className="p-3 text-left">Arrest Date</th>
                                                    <th className="p-3 text-left">Court</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {records.map((record, index) => (
                                                    <tr key={index} className="border-t">
                                                    <td className="p-3">{record.offenseType}</td>
                                                    <td className="p-3">{record.offenseCategory}</td>
                                                    <td className="p-3">{record.caseStatus}</td>
                                                    <td className="p-3">{(new Date(record.arrestDate)).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                                    <td className="p-3">{record.courtName ?? '—'}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
    </div>
    )
}