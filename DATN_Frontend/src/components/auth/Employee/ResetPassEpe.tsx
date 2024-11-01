import { useForm } from 'react-hook-form'
import { useResetPasswordMutation } from '../../../service/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import myImage from '../../../assets/img/logo.jpg';
import { useNavigate, NavLink } from 'react-router-dom'

type Props = {}

const ResetPassEpe = (props: Props) => {
    const urlParams = new URLSearchParams(window.location.search)
    const token: any = urlParams.get('token')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [resetPassword] = useResetPasswordMutation()
    const navigate = useNavigate()
    const resetPass = async ({ password, repass }: any) => {
        if (password != repass) {
            return toast.warning('Mật khẩu không khớp')
        }
        const reset: any = await resetPassword({ token, password })
        const { data: rs } = reset
        if (rs?.success) {
            return Swal.fire('Congratulations', 'Đổi mật khẩu thành công!', 'success').then(() => {
                navigate('/login')
            })
        } else {
            return toast.error(rs?.mes)
        }
    }
    return (
        <>
            <div className="border-0 text-dark relative">
                <div className='bg-gradient-to-r from-[#FF703C] to-[#0053EB] min-h-[30vh] z-[-1000] text-white font-[500]'>
                    <NavLink to='/'>
                        <img width={150} height={150} src={myImage} alt="" />
                    </NavLink>
                </div>
                <div className="absolute top-[40%] left-[27%] bg-white">
                    <div className="w-[600px] min-h-[70vh] shadow">
                        <div className="p-5">
                            <div className="pb-4 flex justify-center">
                                <svg width="200px" height="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 200" xmlSpace="preserve">
                                    <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                            .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#EFF0F2;}\n                            .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#4285F4;}\n                            .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#005AFF;}\n                            .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#001744;}\n                            .st4{fill-rule:evenodd;clip-rule:evenodd;fill:url(#Path_00000109727466101490705270000002221097310213036726_);}\n                            .st5{fill:#DFE1E5;}\n                            .st6{fill-rule:evenodd;clip-rule:evenodd;fill:#BABFC5;}\n                            .st7{fill:#FFFFFF;}\n                            .st8{opacity:0.5;fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;enable-background:new    ;}\n                            .st9{fill-rule:evenodd;clip-rule:evenodd;fill:url(#Path_00000103980070254117689490000003414820839172756651_);}\n                            .st10{fill-rule:evenodd;clip-rule:evenodd;fill:#EA4335;}\n\n                            .st11{opacity:0.5;fill-rule:evenodd;clip-rule:evenodd;fill:url(#Path_00000114787410606178098290000011078242878783421847_);enable-background:new    ;}\n                            .st12{fill-rule:evenodd;clip-rule:evenodd;fill:#BBBFC3;}\n                            .st13{fill-rule:evenodd;clip-rule:evenodd;fill:#DFE1E5;}\n                            .st14{fill:none;stroke:#BABFC5;stroke-width:1.2346;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n                            .st15{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}\n                            .st16{fill-rule:evenodd;clip-rule:evenodd;fill:#34A853;}\n                            .st17{fill:#4688F1;}\n                            .st18{fill-rule:evenodd;clip-rule:evenodd;fill:#4688F1;}\n                            .st19{fill-rule:evenodd;clip-rule:evenodd;fill:url(#Path_00000111891872168890299990000002828651614147878319_);}\n                            .st20{fill-rule:evenodd;clip-rule:evenodd;fill:#FABB05;}\n                            .st21{fill-rule:evenodd;clip-rule:evenodd;fill:#EDA606;}\n                            .st22{fill-rule:evenodd;clip-rule:evenodd;fill:#23893C;}\n                            .st23{fill-rule:evenodd;clip-rule:evenodd;fill:#CDD0D5;}\n                            .st24{display:none;}\n                            .st25{display:inline;fill:url(#SVGID_1_);}\n                            .st26{display:inline;fill:url(#SVGID_00000091010284711140075290000006210620556934897843_);}\n                            .st27{display:inline;fill:url(#SVGID_00000078008260524862635110000001480609954877502629_);}\n                            .st28{display:inline;fill:url(#SVGID_00000070819209468788921770000007837140157146645910_);}\n                        " }} />
                                    <g id="Page-1">
                                        <g id="Group">
                                            <g id="account">
                                                <path id="Path" className="st0" d="M88.3,59.9H88C88.1,59.9,88.2,59.9,88.3,59.9z" />
                                                <path id="Path_00000109751683181196322870000012001553581263762049_" className="st1" d="M178.6,125.6L178.6,125.6L178.6,125.6z" />
                                                <path id="Path_00000033360544319962247520000003308455337977721020_" className="st2" d="M171,68.1V20.9L99,0.1L27,20.9v47.2
				c0,0-2.7,83.1,72,115.5C173.7,151.2,171,68.1,171,68.1z" />
                                                <circle id="Oval" className="st3" cx="98.5" cy="76.3" r="43.2" />
                                                <linearGradient id="Path_00000154388667030127741020000002517925260654780558_" gradientUnits="userSpaceOnUse" x1="-853.7424" y1="619.9042" x2="-853.7424" y2="618.9211" gradientTransform="matrix(180.5531 0 0 -20.8543 154238.1562 13107.7246)">
                                                    <stop offset={0} style={{ stopColor: '#676C72', stopOpacity: '0.3' }} />
                                                    <stop offset="0.96" style={{ stopColor: '#F9F9FA', stopOpacity: '1.000000e-02' }} />
                                                    <stop offset={1} style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
                                                </linearGradient>
                                                <path id="Path_00000130634327234687738330000003536838477786442657_" style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: 'url(#Path_00000154388667030127741020000002517925260654780558_)' }} d="
				M2.1,183.1v-4h106.5l53.1,0.1l20.9,20.8h-141L30,188.4l-19.3-0.1c-2.1,0-4.1-0.8-5.6-2.2L2.1,183.1z" />
                                                <path id="Shape" className="st5" d="M148,180.4l14,2.5c1,0.2,2-0.1,2.8-0.8c0.8-0.7,1.2-1.6,1.2-2.6v-42.4c0-1-0.5-2-1.2-2.6
				c-0.8-0.7-1.8-0.9-2.8-0.8l-14,2.5V180.4z M114.7,180.9l15.2,2.7V133l-15.2,2.7c-1.7,0.3-2.9,1.7-2.9,3.4v38.5
				C111.9,179.2,113.1,180.6,114.7,180.9z" />
                                                <polygon id="Path_00000025415793329300261370000005514718738446935707_" className="st6" points="130,183.6 148.1,180.4 148.1,136.1
				130,133 			" />
                                                <path id="Shape_00000147214429231687373180000004241928170383579800_" className="st7" d="M148,176l11.3,1.6c0.6,0.1,1.1-0.1,1.6-0.5
				c0.4-0.4,0.7-0.9,0.7-1.5v-34.8c0-0.6-0.2-1.1-0.7-1.5c-0.4-0.4-1-0.5-1.6-0.5l-11.3,1.6V176z M117.5,176.8l12.5,1.8V138
				l-12.5,1.8c-1,0.1-1.7,1-1.7,2v33.1C115.8,175.8,116.5,176.7,117.5,176.8z" />
                                                <polygon id="Path_00000085965787521474060800000018093045892278988433_" className="st8" points="130,178.6 148.1,176 148.1,140.5
				130,138 			" />
                                                <linearGradient id="Path_00000087394209256293332240000003041526138286498197_" gradientUnits="userSpaceOnUse" x1="-811.6332" y1="631.379" x2="-810.5059" y2="631.379" gradientTransform="matrix(18.0864 0 0 -48.1309 14789.1367 30548.3477)">
                                                    <stop offset={0} style={{ stopColor: '#676C72', stopOpacity: '0.7' }} />
                                                    <stop offset="0.27" style={{ stopColor: '#70767C', stopOpacity: '0.58' }} />
                                                    <stop offset="0.77" style={{ stopColor: '#888F97', stopOpacity: '0.26' }} />
                                                    <stop offset={1} style={{ stopColor: '#959CA5', stopOpacity: '0.1' }} />
                                                </linearGradient>
                                                <path id="Path_00000070113120228802198960000016496010775513460632_" style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: 'url(#Path_00000087394209256293332240000003041526138286498197_)' }} d="
				M115.8,135.5l-1,0.2c-1.7,0.3-2.9,1.7-2.9,3.4v38.5c0,1.7,1.2,3.1,2.9,3.4l15.2,2.7v-33.9L115.8,135.5z" />
                                                <ellipse id="Oval_00000081616404041076898480000011505453876757550224_" className="st10" cx="139.5" cy="141.8" rx={13} ry="13.1" />
                                                <path id="Shape_00000137117927613948330640000015889824799633049777_" className="st7" d="M139.5,136.5c2.1,0,4,1.3,4.8,3.3
				c0.8,2,0.4,4.2-1.1,5.7c-1,1-2.3,1.5-3.7,1.5c-2.1,0-4-1.3-4.8-3.3c-0.8-2-0.3-4.2,1.2-5.7C136.8,137.1,138.1,136.5,139.5,136.5
				L139.5,136.5z M139.5,135.3c-3.6,0-6.5,2.9-6.5,6.5c0,3.6,2.9,6.5,6.5,6.5c3.6,0,6.5-2.9,6.5-6.5
				C146,138.2,143.1,135.3,139.5,135.3z" />
                                                <polygon id="Path_00000023267643399034828270000002197167164517328770_" className="st10" points="139.5,166.7 128.3,148.5
				150.7,148.3 			" />
                                                <linearGradient id="Path_00000183234420164657140770000017108883291248445838_" gradientUnits="userSpaceOnUse" x1="-825.9797" y1="628.736" x2="-825.5168" y2="628.9605" gradientTransform="matrix(26.0208 0 0 -37.9654 21619.3516 24025.582)">
                                                    <stop offset={0} style={{ stopColor: '#EA4335' }} />
                                                    <stop offset={1} style={{ stopColor: '#FFFFFF' }} />
                                                </linearGradient>
                                                <path id="Path_00000146461748992927065570000006170477821986815411_" style={{ opacity: '0.5', fillRule: 'evenodd', clipRule: 'evenodd', fill: 'url(#Path_00000183234420164657140770000017108883291248445838_)' }} d="
				M139.5,128.7c-4.7,0-9,2.6-11.3,6.7c-2.3,4.1-2.2,9.1,0.2,13.1l11.2,18.1l10.6-17.3c2.8-4,3.2-9.2,1-13.6
				C148.9,131.5,144.4,128.8,139.5,128.7L139.5,128.7z" />
                                                <path id="Rectangle" className="st12" d="M90.6,126.3l20.6-0.1c2.5,0,4.5,2,4.5,4.4l0.3,48.5c0,2.5-2,4.5-4.4,4.5L91,183.6
				c-2.5,0-4.5-2-4.5-4.4l-0.3-48.5C86.2,128.3,88.2,126.3,90.6,126.3z" />
                                                <path id="Rectangle_00000168080010735230980240000018395880994009303187_" className="st13" d="M88.6,126.3l20.6-0.1
				c2.5,0,4.5,2,4.5,4.4l0.3,48.5c0,2.5-2,4.5-4.4,4.5L89,183.7c-2.5,0-4.5-2-4.5-4.4l-0.3-48.5C84.2,128.3,86.2,126.3,88.6,126.3z" />
                                                <path id="Path_00000088100843543473852950000016189121681758390924_" className="st14" d="M94.7,129.2h9.9" />
                                                <path id="Path_00000046327950474434831630000011075257154031227791_" className="st15" d="M108.8,179.1H89.6c-0.8,0-1.5-0.3-2-0.8
				c-0.5-0.5-0.8-1.3-0.8-2l-0.1-41.5c0-1.6,1.3-2.9,2.9-2.9h19.2c1.6,0,2.9,1.3,2.9,2.9l0.1,41.5c0,0.8-0.3,1.5-0.8,2
				C110.3,178.8,109.5,179.1,108.8,179.1z" />
                                                <path id="Path_00000054978267190899245170000009198492010018662328_" className="st16" d="M116.7,163.7c1-2.9-0.2-6.2-2.8-7.8l0,5
				L116.7,163.7z" />
                                                <path id="Shape_00000032616960746190753670000005648550771086549428_" className="st17" d="M86.7,136.7v-1.5l-2.4,0l0,4
				C84.8,138.3,85.7,137.4,86.7,136.7z M83.4,142.8c0,1.2,0.3,2.5,0.9,3.6l0-7C83.7,140.4,83.4,141.6,83.4,142.8z" />
                                                <path id="Path_00000155142955589174462100000012320385517687569583_" className="st18" d="M86.7,148.8v-12.1c-1,0.6-1.8,1.5-2.4,2.6
				l0,7C84.9,147.3,85.7,148.2,86.7,148.8z" />
                                                <linearGradient id="Path_00000005965961203227614250000004886256882966721952_" gradientUnits="userSpaceOnUse" x1="-813.0975" y1="631.445" x2="-812.0975" y2="631.445" gradientTransform="matrix(18.7136 0 0 -48.4816 15300.209 30772.8711)">
                                                    <stop offset={0} style={{ stopColor: '#676C72', stopOpacity: '0.7' }} />
                                                    <stop offset="0.27" style={{ stopColor: '#70767C', stopOpacity: '0.58' }} />
                                                    <stop offset="0.77" style={{ stopColor: '#888F97', stopOpacity: '0.26' }} />
                                                    <stop offset={1} style={{ stopColor: '#959CA5', stopOpacity: '0.1' }} />
                                                </linearGradient>
                                                <path id="Path_00000081623863431857921480000002059704014683153594_" style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: 'url(#Path_00000005965961203227614250000004886256882966721952_)' }} d="
				M88.2,135.2l-3.9,0.1l0.3,44c0,1.2,0.5,2.3,1.3,3.1c0.8,0.8,2,1.3,3.1,1.3l14,0v-30c0-2.3-0.9-4.5-2.6-6.2L88.2,135.2z" />
                                                <path id="Path_00000169535461826568506490000009177189082026936507_" className="st20" d="M83.4,142.8c0,1.2,0.3,2.5,0.9,3.6l0-7
				C83.7,140.4,83.4,141.6,83.4,142.8z" />
                                                <path id="Path_00000032624698566194708100000009184587112009119620_" className="st15" d="M103,141.4c0.3,0,0.6-0.3,0.6-0.6
				c0-0.3-0.3-0.6-0.6-0.6h-9.9l1.2,1.2H103z" />
                                                <path id="Path_00000135673173954754970890000004238118995716348304_" className="st20" d="M102.5,135.6h-12c-4,0-7.2,3.2-7.2,7.2
				c0,3.3,2.3,6.2,5.5,7v3.8l3.6-3.6h10.1c1.9,0,3.7-0.8,5.1-2.1c1.3-1.3,2.1-3.2,2.1-5.1c0-1.9-0.8-3.7-2.1-5.1
				C106.3,136.3,104.5,135.6,102.5,135.6z" />
                                                <path id="Path_00000183948953899176014680000018026736273086149048_" className="st21" d="M88.9,149.8v3.8l3.6-3.6h9.7
				c-0.4-0.9-1-1.8-1.8-2.5l-11.6-11.6c-1.9,0.5-3.5,1.8-4.5,3.5l0,7C85.3,148.1,87,149.3,88.9,149.8z" />
                                                <path id="Path_00000181073224012952173130000010619667031662505877_" className="st16" d="M110.3,154.9H101c-1.8,0-3.5,0.7-4.8,2
				c-1.3,1.3-2,3-2,4.8c0,1.8,0.7,3.5,2,4.8c1.3,1.3,3,2,4.8,2h7.2l3.4,3.4v-3.6c3.2-0.6,5.5-3.4,5.5-6.6c0-1.8-0.7-3.5-2-4.8
				C113.8,155.6,112.1,154.9,110.3,154.9z" />
                                                <path id="Path_00000008832463121624267460000013367202513252481942_" className="st22" d="M101,154.9c-3.7,0-6.7,3-6.7,6.7
				s3,6.7,6.7,6.7h2v-13.5H101z" />
                                                <path id="Shape_00000007397067878931325350000014327163178366200241_" className="st7" d="M110.5,162.3h-10c-0.3,0-0.6-0.3-0.6-0.6
				c0-0.3,0.3-0.6,0.6-0.6h10c0.3,0,0.6,0.3,0.6,0.6C111.1,162,110.8,162.3,110.5,162.3z M103,144.3H91.3c-0.3,0-0.6,0.3-0.6,0.6
				c0,0.3,0.3,0.6,0.6,0.6H103c0.3,0,0.6-0.3,0.6-0.6C103.7,144.6,103.4,144.3,103,144.3z M91.3,141.4H103c0.3,0,0.6-0.3,0.6-0.6
				s-0.3-0.6-0.6-0.6H91.3c-0.3,0-0.6,0.3-0.6,0.6S90.9,141.4,91.3,141.4z" />
                                                <path id="Shape_00000139986494964766977890000008383672874111867307_" className="st5" d="M100.4,161.1c-0.3,0-0.6,0.3-0.6,0.6
				c0,0.3,0.3,0.6,0.6,0.6h2.5v-1.2H100.4z M90.6,144.9c0,0.3,0.3,0.6,0.6,0.6h7.2l-1.2-1.2h-6c-0.2,0-0.3,0.1-0.4,0.2
				C90.7,144.6,90.6,144.7,90.6,144.9z M90.6,140.8c0,0.3,0.3,0.6,0.6,0.6h3.2l-1.2-1.2h-1.9c-0.2,0-0.3,0.1-0.4,0.2
				S90.6,140.7,90.6,140.8z" />
                                                <path id="Path_00000139264331350196799790000012147019996603552648_" className="st12" d="M31.5,133.2h53c2.5,0,4.4,2,4.4,4.4v41.4
				H31.5c-2.5,0-4.4-2-4.4-4.4v-37C27,135.2,29,133.2,31.5,133.2z" />
                                                <path id="Path_00000158024662831498050430000009491306426514639291_" className="st13" d="M30,133.2h53c2.5,0,4.4,2,4.4,4.4v41.4
				H25.5v-41.4C25.5,135.2,27.5,133.2,30,133.2z" />
                                                <path id="Rectangle_00000012469822079427882160000001920995932244001434_" className="st15" d="M30.2,136h52.6c1.1,0,2,0.9,2,2v36.4
				c0,1.1-0.9,2-2,2H30.2c-1.1,0-2-0.9-2-2V138C28.1,136.9,29.1,136,30.2,136z" />
                                                <path id="Path_00000065760924969839732700000012761761323995171208_" className="st12" d="M88.9,179.1l-63.8,0v4.8h59.4
				c2.5,0,4.4-2,4.4-4.4V179.1z" />
                                                <circle id="Oval_00000036212559629925139970000015001900425757769859_" className="st10" cx={57} cy="156.3" r="11.2" />
                                                <path id="Shape_00000109726043496513066690000013122097141834725258_" className="st7" d="M54.9,150.7l7.7,5.5l-7.7,5.7L54.9,150.7
				L54.9,150.7z M54.8,149.4c-0.2,0-0.4,0-0.5,0.1c-0.4,0.2-0.7,0.6-0.6,1.1V162c0,0.7,0.5,1.2,1.2,1.2c0.3,0,0.5-0.1,0.7-0.2
				l7.8-5.8c0.3-0.2,0.5-0.6,0.5-1s-0.2-0.7-0.5-1l-7.8-5.6C55.3,149.5,55.1,149.4,54.8,149.4L54.8,149.4z" />
                                                <path id="Path_00000166654596773400286420000007572442972216262801_" className="st23" d="M0.1,179.1h62.1v0.3c0,2.5-2,4.4-4.4,4.4
				H4.6c-2.5,0-4.4-2-4.4-4.4V179.1z" />
                                                <path id="Path_00000128462712142202692800000008467828088583261860_" className="st0" d="M34.6,181.3h-9.5c-1.2,0-2.1-0.9-2.1-2.1
				c0,0,0-0.1,0.1-0.1h13.7c0,0,0.1,0,0.1,0.1C36.7,180.3,35.8,181.3,34.6,181.3z" />
                                            </g>
                                        </g>
                                    </g>
                                    <g id="logo" className="st24">
                                        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="84.4903" y1="147.2616" x2="117.5106" y2="147.2616" gradientTransform="matrix(1 0 0 -1 0 202)">
                                            <stop offset={0} style={{ stopColor: '#3CAAFF' }} />
                                            <stop offset="0.24" style={{ stopColor: '#47B2FF' }} />
                                            <stop offset="0.68" style={{ stopColor: '#67C9FF' }} />
                                            <stop offset={1} style={{ stopColor: '#82DCFF' }} />
                                        </linearGradient>
                                        <path className="st25" d="M116.1,58.1c-4-0.6-8.6,1-8.6,1c-5.2,1.7-9.9,1.2-9.9,1.2C93.8,60,90,58.7,90,58.7c-2.4-0.7-5.5-0.9-5.5-0.9
		s6.5-6.5,16.1-8.3c0,0,11.7-2.7,16.8,7.6c0.3,0.5-0.2,1.1-0.8,1L116.1,58.1L116.1,58.1z" />
                                        <linearGradient id="SVGID_00000092455748953606315400000012514626245770911117_" gradientUnits="userSpaceOnUse" x1="129.4445" y1="135.2361" x2="95.8537" y2="108.7702" gradientTransform="matrix(1 0 0 -1 0 202)">
                                            <stop offset="0.1" style={{ stopColor: '#005AFF' }} />
                                            <stop offset="0.13" style={{ stopColor: '#035EFF' }} />
                                            <stop offset="0.5" style={{ stopColor: '#2287FF' }} />
                                            <stop offset="0.79" style={{ stopColor: '#35A0FF' }} />
                                            <stop offset="0.96" style={{ stopColor: '#3CAAFF' }} />
                                        </linearGradient>
                                        <path style={{ display: 'inline', fill: 'url(#SVGID_00000092455748953606315400000012514626245770911117_)' }} d="M117.8,59.3
		c0,0,11.6-0.4,12,12.1c0,0,0.5,10-9.8,19.4c0,0-8.6,8.3-18.3,8.1c-0.5,0-0.7-0.7-0.2-1c2.6-1.4,7.6-5.1,13-13.6
		C114.5,84.3,123,72.2,117.8,59.3L117.8,59.3z" />
                                        <linearGradient id="SVGID_00000160880983515640214120000003034690926298354841_" gradientUnits="userSpaceOnUse" x1="68.381" y1="109.6578" x2="98.3446" y2="109.6578" gradientTransform="matrix(1 0 0 -1 0 202)">
                                            <stop offset={0} style={{ stopColor: '#82DCFF' }} />
                                            <stop offset="0.25" style={{ stopColor: '#65C7FF' }} />
                                            <stop offset="0.57" style={{ stopColor: '#47B2FF' }} />
                                            <stop offset="0.75" style={{ stopColor: '#3CAAFF' }} />
                                        </linearGradient>
                                        <path style={{ display: 'inline', fill: 'url(#SVGID_00000160880983515640214120000003034690926298354841_)' }} d="M100.2,99.5
		c0,0-14.8,10-25.4,0.5c0,0-7.4-6.5-3.4-18.9c0.2-0.6,1-0.7,1.3-0.1c1.7,3.4,6.2,11.5,13.6,15.2C86.3,96.2,91.6,99.6,100.2,99.5
		L100.2,99.5z" />
                                        <linearGradient id="SVGID_00000012441153998717334230000005462477541509174941_" gradientUnits="userSpaceOnUse" x1="69.0723" y1="127.1788" x2="88.5562" y2="136.981" gradientTransform="matrix(1 0 0 -1 0 202)">
                                            <stop offset={0} style={{ stopColor: '#005AFF' }} />
                                            <stop offset="0.26" style={{ stopColor: '#1272FF' }} />
                                            <stop offset="0.75" style={{ stopColor: '#309AFF' }} />
                                            <stop offset={1} style={{ stopColor: '#3CAAFF' }} />
                                        </linearGradient>
                                        <path style={{ display: 'inline', fill: 'url(#SVGID_00000012441153998717334230000005462477541509174941_)' }} d="M87.3,60.4
		c-2.9,1.9-10.1,7.7-12.8,21.3c0,0-6.1-9.7-0.4-17.7c0,0,3.8-5.7,13-4.5C87.6,59.5,87.7,60.2,87.3,60.4L87.3,60.4z" />
                                    </g>
                                    <g id="logo_00000012431597907396149690000017339761258656733610_">
                                        <path className="st7" d="M112.4,62.4c-3-0.5-6.6,0.7-6.6,0.7c-4,1.3-7.6,0.9-7.6,0.9c-2.9-0.1-5.9-1.1-5.9-1.1
		c-1.9-0.6-4.2-0.7-4.2-0.7s5-5,12.4-6.4c0,0,9-2.1,12.9,5.9c0.2,0.4-0.1,0.9-0.6,0.8L112.4,62.4L112.4,62.4z" />
                                        <path className="st7" d="M113.6,63.3c0,0,8.9-0.3,9.2,9.3c0,0,0.4,7.7-7.5,14.9c0,0-6.6,6.4-14.1,6.2c-0.4,0-0.5-0.6-0.2-0.8
		c2-1.1,5.9-3.9,10-10.4C111.1,82.5,117.7,73.2,113.6,63.3L113.6,63.3z" />
                                        <path className="st7" d="M100.2,94.2c0,0-11.4,7.7-19.5,0.4c0,0-5.7-5-2.6-14.5c0.1-0.5,0.8-0.5,1-0.1c1.3,2.6,4.8,8.8,10.4,11.7
		C89.4,91.7,93.5,94.3,100.2,94.2L100.2,94.2z" />
                                        <path className="st7" d="M90.3,64.2c-2.3,1.4-7.8,5.9-9.8,16.3c0,0-4.7-7.4-0.3-13.6c0,0,2.9-4.4,10-3.5C90.5,63.5,90.6,64,90.3,64.2
		L90.3,64.2z" />
                                    </g>
                                </svg>

                            </div>
                            <p className='text-center'>Hãy nhập mật khẩu mới để xác nhận thay đổi mật khẩu.</p>
                            <form onSubmit={handleSubmit(resetPass)}>
                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu mới</label>
                                    <input type="password"
                                        {...register('password',
                                            {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 50,
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                            }
                                        )}
                                        placeholder=''
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='password' />
                                    <p>Từ 6 đến 50 ký tự, 1 chữ hoa, 1 chữ thường.</p>
                                    {errors.password && errors.password.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                    {errors.password && errors.password.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                </div>

                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu xác nhận</label>
                                    <input type="password"
                                        {...register('repass',
                                            {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 50,
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                            }
                                        )}
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='repass' />
                                    {errors.repass && errors.repass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu xác nhận</span>}
                                    {errors.repass && errors.repass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                </div>

                                <button className="bg-[#FE7D55] hover:bg-[#FD6333] btn-block flex items-center justify-center py-3 gap-2 rounded text-white">
                                    Thay đổi
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassEpe