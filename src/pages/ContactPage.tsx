import React, { useState } from 'react';
import { SiteConfig, ContactInquiry } from '../types/portfolio';
import { validateContactForm } from '../utils/portfolio';
import { Mail, Instagram, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  siteConfig: SiteConfig;
}

export const ContactPage: React.FC<ContactPageProps> = ({ siteConfig }) => {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    type: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      type: 'general',
      message: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 pb-8 border-b border-[#201E1C]/15">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#713C42] font-semibold">
          <span>{siteConfig.edition}</span>
          <span aria-hidden="true">·</span>
          <span>Canais de Comunicação</span>
        </div>

        <div className="max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#201E1C] font-normal">
            Contato & Consultas
          </h1>
          <p className="text-sm sm:text-base text-[#201E1C]/75 font-light mt-2 leading-relaxed">
            Para propostas de ensaios editoriais, empréstimo de peças conceituais, desenvolvimento de projetos e diálogos profissionais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl text-[#201E1C]">
              Canais Diretos
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 border border-[#201E1C]/15 bg-white">
                <Mail className="w-4 h-4 text-[#713C42] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block text-[#201E1C] uppercase text-[10px] tracking-wider">
                    E-mail Direto
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-[#201E1C] hover:text-[#713C42] underline underline-offset-2"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-[#201E1C]/15 bg-white">
                <Instagram className="w-4 h-4 text-[#713C42] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block text-[#201E1C] uppercase text-[10px] tracking-wider">
                    Instagram & Pesquisa Visual
                  </span>
                  <span className="text-[#201E1C]">{siteConfig.instagramHandle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Press / Stylist pull notes */}
          <div className="border border-[#201E1C]/15 bg-[#201E1C]/5 p-6 space-y-3 text-xs leading-relaxed">
            <h3 className="font-semibold uppercase text-[10px] tracking-widest text-[#713C42]">
              Empréstimos para Stylists & Editoriais
            </h3>
            <p className="text-[#201E1C]/80 font-light">
              As peças protótipo desenvolvidas estão disponíveis para produções de moda, ensaios editoriais e exposições.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="border border-[#201E1C]/15 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#201E1C] mb-2">
              Envie uma Mensagem
            </h2>
            <p className="text-xs text-[#201E1C]/70 mb-6 font-light">
              Preencha os campos abaixo com os detalhes da solicitação. Retornamos em breve.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#713C42]/10 text-[#713C42] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl text-[#201E1C]">
                  Mensagem Enviada
                </h3>
                <p className="text-xs sm:text-sm text-[#201E1C]/70 max-w-md mx-auto font-light leading-relaxed">
                  Obrigado por seu contato, <strong>{formData.name}</strong>. Sua mensagem foi registrada com sucesso.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-wider hover:bg-[#713C42] transition-colors cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider font-semibold text-[#201E1C] mb-1">
                    Nome Completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome ou nome da publicação"
                    className={`w-full bg-[#F2EEE7]/40 border px-3 py-2.5 text-sm text-[#201E1C] focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#201E1C]/20 focus:border-[#713C42]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider font-semibold text-[#201E1C] mb-1">
                    Endereço de E-mail *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemplo@email.com"
                    className={`w-full bg-[#F2EEE7]/40 border px-3 py-2.5 text-sm text-[#201E1C] focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#201E1C]/20 focus:border-[#713C42]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="contact-type" className="block text-xs uppercase tracking-wider font-semibold text-[#201E1C] mb-1">
                    Natureza da Consulta
                  </label>
                  <select
                    id="contact-type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as ContactInquiry['type'],
                      })
                    }
                    className="w-full bg-[#F2EEE7]/40 border border-[#201E1C]/20 px-3 py-2.5 text-sm text-[#201E1C] focus:outline-none focus:border-[#713C42]"
                  >
                    <option value="general">Informações Gerais / Contato</option>
                    <option value="press">Imprensa, Styling & Empréstimos</option>
                    <option value="collaboration">Parceria Editorial ou Direção Criativa</option>
                    <option value="commission">Peça Exclusiva / Projeto Sob Medida</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider font-semibold text-[#201E1C] mb-1">
                    Mensagem *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva o projeto, datas pretendidas ou detalhes do pedido..."
                    className={`w-full bg-[#F2EEE7]/40 border px-3 py-2.5 text-sm text-[#201E1C] focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#201E1C]/20 focus:border-[#713C42]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
                  >
                    <span>Transmitir Mensagem</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
