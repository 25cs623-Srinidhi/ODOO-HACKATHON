import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    function login(){

        navigate("/dashboard");

    }

    return(

        <div
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
            background:"#f2f5f9"
        }}
        >

            <div
            style={{
                width:"350px",
                padding:"30px",
                background:"white",
                borderRadius:"10px",
                boxShadow:"0px 0px 10px gray"
            }}
            >

                <h2>TransitOPS</h2>

                <input
                type="email"
                placeholder="Email"
                style={{
                    width:"100%",
                    padding:"10px",
                    marginBottom:"15px"
                }}
                />

                <input
                type="password"
                placeholder="Password"
                style={{
                    width:"100%",
                    padding:"10px",
                    marginBottom:"20px"
                }}
                />

                <button
                style={{
                    width:"100%",
                    padding:"12px",
                    cursor:"pointer"
                }}
                onClick={login}
                >

                    Login

                </button>

            </div>

        </div>

    )

}