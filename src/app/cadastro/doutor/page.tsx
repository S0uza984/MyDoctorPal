"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingCadastro from "../../../components/loadings/LoadingCadastro";
import Link from "next/link";
export default function DoctorRegister() {
    const [formData, setFormData] = useState({
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      crm: "",
      cpf:"",
      especialidade: "",
    })
    const [mensagem, setMensagem] = useState("");
    const Router = useRouter();
    const [Loading, setLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      })
      );
    }
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.cpf.length !== 11) {
        setMensagem("O CPF deve ter exatamente 11 caracteres.");
        return;
      }
      if (formData.crm.length !== 6) {
        setMensagem("O CRM deve ter exatamente 6 caracteres.");
        return;
      }
      if (formData.telefone.length !== 11) {
        setMensagem("O Telefone deve ter exatamente 11 digitos.");
        return;
      }
      try{
      const response = await fetch("/api/cadastro/doutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok){
        setMensagem(data.message);
        setLoading(true);
        setTimeout(() => {
          Router.push("/login/doutor");
        },2000);
      }
      else{
        setMensagem(data.error);
      }
    }
    catch(error){
      console.error("Erro:", error);
      setMensagem("Erro ao conectar com o servidor.");} 
    }
    
    if (Loading) {
      return <LoadingCadastro />;
    }
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-96">
          <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
            <span>MyDoctorPal</span>
            <span>Cadastro de Médico</span>
          </div>
          <form className="p-6 space-y-3 text-gray-800" onSubmit= {handleSubmit}>
            <input type="text" placeholder="Nome Completo" className="w-full border p-2 rounded" name= "nome" value= {formData.nome} onChange={handleChange}/>
            <input type="email" placeholder="Email" className="w-full border p-2 rounded" name="email" value= {formData.email} onChange={handleChange}/>
            <input type="password" placeholder="Senha" className="w-full border p-2 rounded" name="senha" value= {formData.senha} onChange={handleChange}/>
            <input type="text" placeholder="Telefone" className="w-full border p-2 rounded" name="telefone" value= {formData.telefone} onChange={handleChange}/>
            <input type="text" placeholder="CRM" className="w-full border p-2 rounded" name="crm" value= {formData.crm} onChange={handleChange}/>
            <input type="text" placeholder="CPF" className="w-full border p-2 rounded" name="cpf" value= {formData.cpf} onChange={handleChange}/>
            <input type="text" placeholder="Especialidade" className="w-full border p-2 rounded" name="especialidade" value= {formData.especialidade} onChange={handleChange}/>
            <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold" type="submit">Criar Conta</button>
            <p className="text-sm text-center text-black">Já tem uma conta? <Link href="/login/doutor" className="text-blue-500 font-semibold" >Entrar</Link></p>
          </form>
          {mensagem && (
          <p className="text-red-500 text-sm text-center">{mensagem}</p>
        )}
        </div>
      </div>
    );
  }
  