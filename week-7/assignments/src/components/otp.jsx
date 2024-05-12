import { useRef, useState } from 'react'
import image from '../assets/images.png'
import { resolve } from 'tsconfig';
export function OTP(){
    const [phone,setPhone] = useState('911');
    const [code,setCode] = useState('');
    const [verify,setVerify] = useState(0);
    const [otp,setOtp] = useState('')
    const otp_button = useRef();
    const otp_animation = useRef();
    
    const sendOTP = async()=>{
        const length = 6;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let code = '';
        for(let i=0; i<length; i++){
            const temp = characters[Math.floor(Math.random()*characters.length)];
            code += temp;
        }
        setCode(code);
        const otp_pop = otp_animation.current;
        otp_pop.style.top='10%'
        setVerify(1);
    }
    function PhoneNUM(){
        return <div className="phone_number">
            <div className="heading">Login via OTP</div>
            <input type="text" placeholder='Enter Phone number'/>
            <input type="button" value="Send OTP" ref={otp_button} onClick={()=>sendOTP()}/>
        </div>
    }
    const verifyotp = ()=>{
        if(code == otp) console.log('verified');
        else console.log('Not verified')

    }
    function EnterOTP(){
        return <div className='phone_number2'>
            <div className="heading">Enter OTP</div>
            <input type="text" placeholder='Enter OTP' value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
            <input type="button" value="verify" onClick={()=>verifyotp()}/>
        </div>
    }
    return <div className='otp'>
        <div className="phone">
            <img src={image} alt="" />
            <div className="msg" ref={otp_animation}>
                {code}
            </div>
        </div>
        {(verify)?<EnterOTP/>:<PhoneNUM/>}
    </div>
}