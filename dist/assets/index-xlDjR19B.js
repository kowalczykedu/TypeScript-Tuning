var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r=e((()=>{n=class extends Error{constructor(e,t,n){super(e),this.name=`MotorQuebradoError`,this.motor=t,this.potenciaFinal=n}}})),i,a=e((()=>{r(),i=class{constructor(e,t,n,r,i,a){this.nome=e,this.cilindros=t,this.potenciaBase=n,this.potenciaAtual=n,this.limiteBase=r,this.limiteAtual=r,this.pressaoBase=i,this.pecas=a}getNome(){return this.nome}getCilindros(){return this.cilindros}getPotenciaBase(){return this.potenciaBase}getLimiteBase(){return this.limiteBase}getPotenciaAtual(){return this.potenciaAtual}getLimiteAtual(){return this.limiteAtual}getPressaoBase(){return this.pressaoBase}getPecas(){return this.pecas}adicionarPotencia(e){this.potenciaAtual+=e}adicionarLimite(e){this.limiteAtual+=e}recalcular(){this.potenciaAtual=this.potenciaBase,this.limiteAtual=this.limiteBase;for(let e of this.pecas.values())e.aplicarEfeito(this)}instalarPeca(e,t){let r=Math.round(this.potenciaAtual);if(this.pecas.set(e,t),this.recalcular(),this.potenciaAtual>this.limiteAtual)throw new n(`${this.nome} quebrou! Potência de ${this.potenciaAtual}cv excede o limite de ${this.limiteAtual}cv`,this,r)}}})),o,s=e((()=>{o=function(e){return e.Pistao=`pistao`,e.Biela=`biela`,e.Comando=`comando`,e.Cabecote=`cabecote`,e.Turbina=`turbina`,e.Alimentacao=`alimentacao`,e.ColetorADM=`coletorAdmissao`,e.ColetorESC=`coletorEscape`,e.Intake=`intake`,e.Intercooler=`intercooler`,e.Radiador=`radiador`,e.RadiadorOleo=`radiadorOleo`,e}({})})),c,l=e((()=>{c=class{constructor(e,t,n){this.nome=e,this.modelo=t,this.descricao=n}getNome(){return this.nome}getModelo(){return this.modelo}getDescricao(){return this.descricao}}})),u,d=e((()=>{l(),u=class extends c{constructor(e){super(e,`Original`,``)}aplicarEfeito(e){}}})),f,p=e((()=>{l(),f=class extends c{constructor(e){super(e,`Não Instalada`,``)}aplicarEfeito(e){}}}));function m(e=[]){let t=new Map;for(let n of Object.values(o))e.includes(n)?t.set(n,new f(`${n}`)):t.set(n,new u(`${n}`));return t}var h,g,_,v,y,b,x,S,C,w,T,E=e((()=>{s(),d(),p(),a(),h=new i(`EA211 (Up Tsi)`,3,105,150,.8,m()),g=new i(`Boxer 1600 (Fusca)`,4,54,260,0,m([o.Turbina,o.Intercooler,o.Radiador,o.Intake])),_=new i(`K20Z3 (Civic Si 2008)`,4,192,400,0,m()),v=new i(`Fivetech Turbo (Marea)`,5,182,350,1.2,m()),y=new i(`Powertech 4.1 (Omega)`,6,168,400,0,m()),b=new i(`MWM Sprint 6.07TCA (F-250)`,6,180,250,.8,m()),x=new i(`MWM Sprint 4.07TCA (S-10)`,4,132,200,1.1,m()),S=new i(`Ford 302 Windsor (Maverick)`,8,135,450,0,m()),C=new i(`2JZ-GTE (Supra MK4)`,6,276,450,.7,m()),w=new i(`RB26DETT (Skyline R-34)`,6,286,430,.7,m()),T=[h,g,_,v,y,b,x,S,C,w]})),D,O=e((()=>{l(),D=class extends c{constructor(e,t,n,r){super(e,t,n),this.percentual=r}aplicarEfeito(e){let t=e.getPotenciaBase()*(this.percentual/100);e.adicionarPotencia(t)}}})),k,A=e((()=>{l(),k=class extends c{constructor(e,t,n,r){super(e,t,n),this.percentual=r}aplicarEfeito(e){let t=e.getLimiteBase()*(this.percentual/100);e.adicionarLimite(t)}}})),j,M=e((()=>{l(),j=class extends c{constructor(e,t,n,r,i){super(e,t,n),this.percentualPotencia=r,this.percentualLimite=i}aplicarEfeito(e){let t=e.getPotenciaBase()*(this.percentualPotencia/100);e.adicionarPotencia(t);let n=e.getLimiteBase()*(this.percentualLimite/100);e.adicionarLimite(n)}}})),N,P=e((()=>{l(),N=class extends c{constructor(e,t,n,r){super(e,t,n),this.pressao=r}aplicarEfeito(e){let t=this.pressao-e.getPressaoBase(),n=e.getPotenciaBase()*t;e.adicionarPotencia(n)}}})),F,I=e((()=>{s(),O(),A(),M(),P(),F=new Map,F.set(o.Turbina,[new N(`Turbina Pequena`,`Master Power R4449`,`Turbina nacional de resposta rápida, ideal para projetos de rua com ganho de potência moderado.`,1),new N(`Turbina Média`,`Garrett GT2860RS`,`Modelo esportivo com ótimo equilíbrio entre desempenho e tempo de enchimento da turbina.`,2),new N(`Turbina Grande`,`Holset HX35`,`Turbina de alto fluxo muito utilizada em projetos turbo nacionais de média e alta potência.`,3),new N(`Turbina Gigante`,`Holset HX55`,`Turbina de competição para motores preparados, capaz de entregar potência extrema em altas rotações.`,4)]),F.set(o.Intake,[new D(`Intake Básico`,`K&N 57 Series`,`Sistema de admissão esportiva que melhora o fluxo de ar e a resposta do acelerador.`,3),new D(`Intake Esportivo`,`K&N 63 Series`,`Admissão de alto fluxo indicada para motores preparados de uso diário.`,5),new D(`Intake Performance`,`K&N 69 Series`,`Filtro de alto desempenho com maior volume de ar para motores aspirados e turbo.`,7),new D(`Intake Competição`,`K&N 77 Series`,`Sistema de admissão premium voltado para máxima eficiência em projetos de alta potência.`,9)]),F.set(o.Comando,[new D(`Comando Aspirado`,`SamCams VW a Ar 284°`,`Comando esportivo para motores boxer aspirados de rua.`,12),new D(`Comando Diesel`,`SamCams Diesel`,`Perfil de comando otimizado para motores diesel preparados e maior torque.`,15),new D(`Comando Turbo`,`SamCams VW a Ar 308° Turbo`,`Comando com perfil otimizado para motores boxer turbo.`,20),new D(`Comando Universal Sport`,`SamCams Universal Stage 2`,`Comando esportivo universal para projetos aspirados e turbo de médio desempenho.`,22),new D(`Comando Universal Race`,`SamCams Universal Stage 3`,`Comando de competição com maior levante e duração para máxima potência.`,30)]),F.set(o.ColetorADM,[new D(`Coletor de Admissão Básico`,`SPA Turbo Weber IDF`,`Coletor de admissão esportivo com melhor distribuição de ar para motores preparados.`,4),new D(`Coletor de Admissão Duplo`,`SPA Turbo Weber IDF Duplo`,`Modelo com maior capacidade de fluxo para preparação intermediária.`,7),new D(`Coletor de Admissão Performance`,`SPA Turbo Weber DCOE`,`Coletor de alto fluxo para motores aspirados e turbo de alta performance.`,9),new D(`Coletor de Admissão Race`,`SPA Turbo TIN2800`,`Coletor de competição projetado para máxima alimentação de ar.`,12)]),F.set(o.ColetorESC,[new D(`Coletor de Escape Básico`,`Universal T3`,`Coletor tubular universal que melhora a vazão dos gases de escape.`,6),new D(`Escape Aspirado`,`Dimension 4x1 VW Boxer`,`Coletor dimensionado que melhora o fluxo dos gases em motores aspirados.`,7),new D(`Coletor de Escape Sport`,`Universal T4`,`Modelo universal de maior fluxo para turbinas de médio porte.`,10),new D(`Escape Turbo`,`SPA Turbo T3 VW Boxer`,`Coletor tubular para instalação de turbina T3 em motores boxer.`,12),new D(`Coletor de Escape Performance`,`Universal T3 High Flow`,`Coletor de alto fluxo com melhor eficiência para projetos turbo.`,15),new D(`Coletor de Escape Race`,`Universal T4 High Flow`,`Coletor de competição para máxima vazão e desempenho em altas rotações.`,22)]),F.set(o.Pistao,[new k(`Pistão Forjado Básico`,`Mahle PowerPak`,`Pistão forjado de entrada que aumenta a resistência do conjunto do motor.`,15),new k(`Pistão Aspirado`,`Mahle 85,5 mm Taxado`,`Pistão de alta compressão para motores aspirados.`,18),new k(`Pistão Forjado Sport`,`Iapel Forged`,`Pistão nacional forjado para suportar preparações intermediárias.`,25),new k(`Pistão Forjado Performance`,`Wiseco Forged`,`Pistão de alta resistência indicado para motores turbo de alto desempenho.`,35),new k(`Pistão Forjado Race`,`JE Pistons Ultra Series`,`Pistão de competição projetado para suportar níveis extremos de potência.`,50)]),F.set(o.Biela,[new k(`Biela Forjada Básica`,`SamCams AP`,`Biela forjada para preparações leves e maior confiabilidade do motor.`,15),new k(`Biela Aspirada`,`SamCams H-Beam VW Boxer`,`Biela reforçada para motores aspirados preparados.`,20),new k(`Biela Forjada Sport`,`SamCams GM`,`Biela reforçada indicada para motores de média potência.`,23),new k(`Biela Forjada Performance`,`SPA Turbo Super A-Beam`,`Biela de alta resistência para motores turbo preparados.`,35),new k(`Biela Forjada Race`,`SPA Turbo Super A-Beam Competition`,`Biela de competição para suportar grandes pressões e altas rotações.`,48)]),F.set(o.Radiador,[new k(`Radiador Básico`,`Visconde Alumínio 1 Fileira`,`Radiador esportivo com melhor capacidade de refrigeração que o original.`,10),new k(`Radiador Sport`,`Visconde Alumínio 2 Fileiras`,`Sistema de refrigeração reforçado para motores preparados.`,18),new k(`Radiador Performance`,`Visconde 3 Fileiras`,`Radiador de alto desempenho para uso intenso e motores turbo.`,27),new k(`Radiador Race`,`Visconde Racing 4 Fileiras`,`Radiador de competição com máxima eficiência de resfriamento.`,38)]),F.set(o.RadiadorOleo,[new k(`Radiador de Óleo Básico`,`SPA Turbo 10 Linhas`,`Ajuda a manter a temperatura do óleo em preparações leves.`,8),new k(`Radiador de Óleo Sport`,`SPA Turbo 13 Linhas`,`Maior capacidade de resfriamento para motores turbo de rua.`,14),new k(`Radiador de Óleo Performance`,`SPA Turbo 16 Linhas`,`Controle eficiente da temperatura do óleo em uso esportivo.`,21),new k(`Radiador de Óleo Race`,`SPA Turbo 19 Linhas`,`Sistema de refrigeração de óleo para projetos de alta potência.`,30)]),F.set(o.Cabecote,[new j(`Cabeçote Street`,`Street Flow`,`Cabeçote retrabalhado para melhorar fluxo de ar e resistência do motor.`,5,8),new j(`Cabeçote Sport`,`Sport Flow`,`Cabeçote preparado para projetos esportivos com maior eficiência volumétrica.`,10,15),new j(`Cabeçote Aspirado`,`Street Flow 40x35,5`,`Cabeçote retrabalhado para motores boxer aspirados.`,12,18),new j(`Cabeçote Race`,`Race Flow`,`Cabeçote usinado para alto desempenho em motores preparados.`,17,25),new j(`Cabeçote Turbo`,`Competition CNC 42x37,5`,`Cabeçote CNC preparado para motores boxer turbo.`,20,30),new j(`Cabeçote Competition`,`Competition CNC`,`Cabeçote CNC de competição com fluxo máximo e alta resistência.`,25,40)]),F.set(o.Intercooler,[new j(`Intercooler Pequeno`,`SPA Turbo 400x190x50`,`Intercooler compacto que reduz a temperatura do ar admitido.`,4,10),new j(`Intercooler Médio`,`SPA Turbo 543x234x44`,`Modelo intermediário com maior capacidade de troca térmica.`,7,16),new j(`Intercooler Grande`,`SPA Turbo 550x230x65`,`Intercooler de alto fluxo indicado para motores turbo preparados.`,10,23),new j(`Intercooler Gigante`,`SPA Turbo 600x300x76`,`Intercooler de competição para máxima eficiência de resfriamento.`,14,32)]),F.set(o.Alimentacao,[new j(`FT Extremamente Básica`,`FuelTech FT300`,`Central de injeção programável bastante utilizada em preparações aspiradas de Fusca, oferecendo controle de injeção e ignição para projetos de entrada.`,5,10),new j(`FT Básica`,`FuelTech FT450`,`Injeção programável de entrada para projetos aspirados e turbo leves.`,7,12),new j(`FT Sport`,`FuelTech FT550`,`Central de injeção com mais recursos para motores preparados.`,9,18),new j(`FT Performance`,`FuelTech FT600`,`Gerenciamento completo para projetos de alta performance.`,14,28),new j(`FT Competition`,`FuelTech FT700`,`Central de competição para motores extremamente preparados.`,20,40)])})),L,R,z=e((()=>{a(),s(),d(),p(),E(),I(),r(),L=`typescript_tuning_garage_builds`,R=class{constructor(){this.motorAtual=null,this.indexMotorAtual=-1,this.quebrado=!1,this.mensagemQuebra=``,this.potenciaFinalQuebra=0,this.registroPecas=new Map}getMotores(){return T.map((e,t)=>({index:t,nome:e.getNome(),cilindros:e.getCilindros(),potenciaBase:e.getPotenciaBase(),limiteBase:e.getLimiteBase(),pressaoBase:e.getPressaoBase()}))}getIndexMotorAtual(){return this.indexMotorAtual}temMotorSelecionado(){return this.motorAtual!==null}selecionarMotor(e){let t=T[e];this.indexMotorAtual=e,this.motorAtual=this.clonarMotor(t),this.quebrado=!1,this.mensagemQuebra=``,this.potenciaFinalQuebra=0,this.registroPecas.clear();for(let[e,n]of t.getPecas())n.getModelo()===`Não Instalada`?this.registroPecas.set(e,{tipo:`nao-instalada`}):this.registroPecas.set(e,{tipo:`original`})}clonarMotor(e){let t=new Map;for(let[n,r]of e.getPecas())r.getModelo()===`Não Instalada`?t.set(n,new f(`${n}`)):t.set(n,new u(`${n}`));return new i(e.getNome(),e.getCilindros(),e.getPotenciaBase(),e.getLimiteBase(),e.getPressaoBase(),t)}isSlotDisponivel(e){if(!this.motorAtual)return{disponivel:!0};let t=this.motorAtual.getNome().toLowerCase();return(t.includes(`fusca`)||t.includes(`boxer 1600`))&&e===o.Radiador?{disponivel:!1,motivo:`Incompatível / Refrigeração a Ar`}:{disponivel:!0}}getPecasPorTipo(e){return F.get(e)??[]}medirPressaoTurbina(e){if(e.getModelo()===`Não Instalada`)return 0;let t=new i(`TestePressao`,4,100,100,0,new Map);e.aplicarEfeito(t);let n=Math.round((t.getPotenciaAtual()-100)/100*10)/10;return Math.max(0,n)}getPressaoTurbinaAtual(){if(!this.motorAtual)return{pressaoAtual:0,pressaoBase:0,pressaoDelta:0,temTurbina:!1,descricao:`Sem motor ativo`};let e=this.motorAtual.getPressaoBase(),t=this.motorAtual.getPecas().get(o.Turbina);if(!t||t.getModelo()===`Não Instalada`)return{pressaoAtual:0,pressaoBase:e,pressaoDelta:-e,temTurbina:!1,descricao:e>0?`Turbina removida (Aspirado)`:`Aspirado natural (Sem turbo)`};if(t.getModelo()===`Original`)return{pressaoAtual:e,pressaoBase:e,pressaoDelta:0,temTurbina:e>0,descricao:e>0?`Pressão original de fábrica (${e.toFixed(1)} kg/cm²)`:`Aspirado natural (Original OEM)`};let n=this.medirPressaoTurbina(t),r=Math.round((n-e)*10)/10,i=``;return i=e===0?`+${n.toFixed(1)} kg/cm² adaptada (Aspirado de fábrica)`:r>0?`+${r.toFixed(1)} kg/cm² vs fábrica (${e.toFixed(1)} kg base)`:r<0?`${r.toFixed(1)} kg/cm² vs fábrica (${e.toFixed(1)} kg base)`:`Mesma pressão de fábrica (${e.toFixed(1)} kg/cm²)`,{pressaoAtual:n,pressaoBase:e,pressaoDelta:r,temTurbina:!0,descricao:i}}calcularBonusPeca(e,t){let r=this.motorAtual?.getPressaoBase()??0,a=new i(`Teste`,4,100,100,r,new Map);t.aplicarEfeito(a);let s=Math.round((a.getPotenciaAtual()-100)*10)/10,c=Math.round((a.getLimiteAtual()-100)*10)/10,l=0,u=0,d=0,f=0,p=!1,m,h;if(e===o.Turbina&&(m=this.medirPressaoTurbina(t),h=Math.round((m-r)*10)/10),this.motorAtual){l=Math.round(this.motorAtual.getPotenciaBase()*s/100),u=Math.round(this.motorAtual.getLimiteBase()*c/100);try{let n=this.clonarMotor(this.motorAtual);for(let[e,t]of this.motorAtual.getPecas())n.getPecas().set(e,t);n.instalarPeca(e,t),d=Math.round(n.getPotenciaAtual()),f=Math.round(n.getLimiteAtual()),p=d>f}catch(e){e instanceof n&&(d=e.potenciaFinal,f=Math.round(this.motorAtual.getLimiteAtual()+u),p=!0)}}let g=[];if(e===o.Turbina&&m!==void 0){if(r===0)g.push(`${m.toFixed(1)} kg/cm² (+${m.toFixed(1)} kg adaptada)`);else{let e=h!==void 0&&h>=0?`+`:``;g.push(`${m.toFixed(1)} kg/cm² (${e}${h?.toFixed(1)} kg vs base ${r.toFixed(1)} kg)`)}}return s>0&&g.push(`+${s}% Potência (+${l} cv)`),c>0&&g.push(`+${c}% Limite (+${u} cv)`),g.length===0&&g.push(`0% Ganho (Original OEM)`),{percentualPotencia:s,percentualLimite:c,ganhoCvPotencia:l,ganhoCvLimite:u,potenciaEstimada:d,limiteEstimado:f,riscoQuebra:p,textoResumo:g.join(` · `),pressaoTurbina:m,pressaoDelta:h}}instalarPeca(e,t){if(!this.motorAtual||this.quebrado)return{sucesso:!1,mensagem:`Motor indisponível.`};let r=this.isSlotDisponivel(e);if(!r.disponivel)return{sucesso:!1,mensagem:r.motivo||`Slot indisponível para este motor.`};let i=F.get(e);if(!i||!i[t])return{sucesso:!1,mensagem:`Peça não encontrada no catálogo.`};try{return this.motorAtual.instalarPeca(e,i[t]),this.registroPecas.set(e,{tipo:`catalogo`,indiceCatalogo:t}),{sucesso:!0}}catch(e){if(e instanceof n)return this.quebrado=!0,this.mensagemQuebra=e.message,this.potenciaFinalQuebra=e.potenciaFinal,{sucesso:!1,mensagem:e.message,potenciaFinal:e.potenciaFinal};throw e}}desinstalarPeca(e){if(!this.motorAtual||this.quebrado)return{sucesso:!1,mensagem:`Motor indisponível.`};try{return this.motorAtual.getPecas().set(e,new f(`${e}`)),this.motorAtual.recalcular(),this.registroPecas.set(e,{tipo:`nao-instalada`}),{sucesso:!0}}catch(e){if(e instanceof n)return this.quebrado=!0,this.mensagemQuebra=e.message,this.potenciaFinalQuebra=e.potenciaFinal,{sucesso:!1,mensagem:e.message,potenciaFinal:e.potenciaFinal};throw e}}restaurarOriginal(e){if(!this.motorAtual||this.quebrado)return{sucesso:!1,mensagem:`Motor indisponível.`};try{return this.motorAtual.getPecas().set(e,new u(`${e}`)),this.motorAtual.recalcular(),this.registroPecas.set(e,{tipo:`original`}),{sucesso:!0}}catch(e){if(e instanceof n)return this.quebrado=!0,this.mensagemQuebra=e.message,this.potenciaFinalQuebra=e.potenciaFinal,{sucesso:!1,mensagem:e.message,potenciaFinal:e.potenciaFinal};throw e}}getEstadoMotor(){if(!this.motorAtual)return null;let e=new Map;for(let[t,n]of this.motorAtual.getPecas()){let r;r=n.getModelo()===`Não Instalada`?`nao-instalada`:n.getModelo()===`Original`?`original`:`modificada`;let i=this.isSlotDisponivel(t),a;t===o.Turbina&&r===`modificada`&&(a=this.medirPressaoTurbina(n)),e.set(t,{nome:n.getNome(),modelo:n.getModelo(),descricao:n.getDescricao(),estado:r,disponivel:i.disponivel,motivoIndisponivel:i.motivo,pressaoPeca:a})}let t=this.getPressaoTurbinaAtual();return{index:this.indexMotorAtual,nome:this.motorAtual.getNome(),cilindros:this.motorAtual.getCilindros(),potenciaBase:this.motorAtual.getPotenciaBase(),limiteBase:this.motorAtual.getLimiteBase(),pressaoBase:this.motorAtual.getPressaoBase(),pressaoTurbina:t,potenciaAtual:this.motorAtual.getPotenciaAtual(),limiteAtual:this.motorAtual.getLimiteAtual(),pecas:e,quebrado:this.quebrado,mensagemQuebra:this.mensagemQuebra,potenciaFinalQuebra:this.potenciaFinalQuebra}}resetarMotor(){this.indexMotorAtual>=0&&this.selecionarMotor(this.indexMotorAtual)}getMotoresSalvos(){try{let e=localStorage.getItem(L);return e?JSON.parse(e):[]}catch{return[]}}salvarMotorAtual(e){if(!this.motorAtual)throw Error(`Nenhum motor ativo para salvar.`);let t=this.getEstadoMotor(),n=[],r={};for(let[e,t]of this.registroPecas.entries())if(r[e]=t,t.tipo===`catalogo`&&t.indiceCatalogo!==void 0){let r=F.get(e)?.[t.indiceCatalogo];r&&n.push(r.getModelo())}let i={id:`build_`+Date.now()+`_`+Math.random().toString(36).substring(2,7),nomePersonalizado:e.trim()||`${this.motorAtual.getNome()} Custom`,motorIndex:this.indexMotorAtual,motorOriginalNome:this.motorAtual.getNome(),cilindros:this.motorAtual.getCilindros(),potenciaBase:this.motorAtual.getPotenciaBase(),limiteBase:this.motorAtual.getLimiteBase(),pressaoBase:this.motorAtual.getPressaoBase(),pressaoFinal:t.pressaoTurbina.pressaoAtual,pressaoDescricao:t.pressaoTurbina.descricao,potenciaFinal:Math.round(t.potenciaAtual),limiteFinal:Math.round(t.limiteAtual),pecasInstaladas:r,pecasCustomizadasNomes:n,dataCriacao:new Date().toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},a=this.getMotoresSalvos();return a.unshift(i),localStorage.setItem(L,JSON.stringify(a)),i}carregarMotorSalvo(e){let t=this.getMotoresSalvos().find(t=>t.id===e);if(!t)return!1;this.selecionarMotor(t.motorIndex);for(let[e,n]of Object.entries(t.pecasInstaladas)){let t=e;n.tipo===`catalogo`&&n.indiceCatalogo!==void 0?this.instalarPeca(t,n.indiceCatalogo):n.tipo===`nao-instalada`?this.desinstalarPeca(t):this.restaurarOriginal(t)}return!0}excluirMotorSalvo(e){let t=this.getMotoresSalvos().filter(t=>t.id!==e);localStorage.setItem(L,JSON.stringify(t))}}})),B,V,H,U=e((()=>{s(),B={[o.Turbina]:{numero:`01`,label:`Turbina`,icone:`mode_fan`,descPadrao:`Módulo de sobrealimentação por gases de escape`},[o.Intake]:{numero:`02`,label:`Intake`,icone:`air`,descPadrao:`Admissão de alto fluxo e filtro de ar`},[o.Intercooler]:{numero:`03`,label:`Intercooler`,icone:`ac_unit`,descPadrao:`Resfriamento do ar comprimido de admissão`},[o.Pistao]:{numero:`04`,label:`Pistão`,icone:`hardware`,descPadrao:`Componente móvel de compressão e câmara de queima`},[o.Biela]:{numero:`05`,label:`Biela`,icone:`build`,descPadrao:`Elo estrutural entre pistão e virabrequim`},[o.Cabecote]:{numero:`06`,label:`Cabeçote`,icone:`view_in_ar`,descPadrao:`Fluxo de válvulas e dutos de admissão/escape`},[o.Comando]:{numero:`07`,label:`Comando de Válvulas`,icone:`settings`,descPadrao:`Duração, graduação e levante das válvulas`},[o.Radiador]:{numero:`08`,label:`Radiador`,icone:`heat_pump`,descPadrao:`Arrefecimento a líquido do bloco do motor`},[o.RadiadorOleo]:{numero:`09`,label:`Radiador de Óleo`,icone:`oil_barrel`,descPadrao:`Controle térmico da lubrificação sob alta carga`},[o.ColetorESC]:{numero:`10`,label:`Coletor de Escape`,icone:`local_fire_department`,descPadrao:`Evacuação dimensionada dos gases de combustão`},[o.ColetorADM]:{numero:`11`,label:`Coletor de Admissão`,icone:`filter_drama`,descPadrao:`Distribuição equitativa de ar nos cilindros`},[o.Alimentacao]:{numero:`12`,label:`Alimentação & Injeção`,icone:`electric_bolt`,descPadrao:`Bicos injetores e calibração de combustível`}},V={8:`/images/supra.png`,9:`/images/skyline.png`},H=class{constructor(e,t){this.abaAtiva=`motores`,this.slotAberto=null,this.modalSalvarAberto=!1,this.modalStatsAberto=!1,this.controller=e,this.app=t}htmlHeader(){let e=this.abaAtiva===`motores`,t=this.abaAtiva===`meus-motores`,n=this.controller.getMotoresSalvos().length;return`
      <header class="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container-high/40 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
        <div class="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between">
          <div class="flex items-center gap-space-md cursor-pointer" id="nav-logo">
            <svg class="h-8 w-auto" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="10" width="40" height="40" rx="8" fill="#14121E" stroke="#9E00FF" stroke-width="1.5"/>
              <path d="M12 22H32M22 22V38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M26 30L34 22L30 38" stroke="#9E00FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="52" y="32" fill="#FFFFFF" font-family="'Syne', sans-serif" font-weight="800" font-size="18" letter-spacing="1.5">TYPESCRIPT</text>
              <text x="52" y="45" fill="#9E00FF" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="11" letter-spacing="4">TUNING</text>
            </svg>
          </div>
          
          <nav class="flex items-center gap-space-sm">
            <button 
              id="tab-motores"
              class="px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider transition-all rounded ${e?`text-on-surface bg-surface-container-high font-semibold shadow-sm`:`text-on-surface-variant hover:text-on-surface hover:bg-surface-container`}"
            >
              Motores
            </button>
            <button 
              id="tab-meus-motores"
              class="px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider transition-all rounded flex items-center gap-1.5 ${t?`text-on-surface bg-surface-container-high font-semibold shadow-sm`:`text-on-surface-variant hover:text-on-surface hover:bg-surface-container`}"
            >
              <span>Meus Motores</span>
              ${n>0?`<span class="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[10px] font-mono">${n}</span>`:``}
            </button>
          </nav>

          <div class="flex items-center gap-space-md">
            <div class="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary shadow-sm" title="Piloto Conectado">
              <span class="material-symbols-outlined text-[18px]">sports_motorsports</span>
            </div>
          </div>
        </div>
      </header>
    `}htmlFooter(){return`
      <footer class="w-full bg-surface-container-lowest border-t border-surface-container-high/30 py-space-lg mt-space-xl">
        <div class="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
          <span class="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
            TypeScript Tuning — Preparação Automotiva & Bancada de Dinamômetro
          </span>
          <span class="font-label-sm text-label-sm text-outline">
            ECU Calibration · Telemetria em Tempo Real · 12 Módulos
          </span>
        </div>
      </footer>
    `}renderizarSelecaoMotor(){this.abaAtiva=`motores`,this.slotAberto=null;let e=this.controller.getMotores();this.app.innerHTML=`
      ${this.htmlHeader()}
      <main class="w-full pt-16 bg-surface flex-1">
        <div class="max-w-7xl mx-auto px-gutter py-space-xl">
          <div class="flex flex-col w-full">
            
            <!-- Header Minimalista da Bancada -->
            <div class="relative w-full mb-space-xl flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div class="space-y-space-xs">
                <div class="flex items-center gap-space-sm">
                  <span class="inline-block w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#9e00ff]"></span>
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Bancada de Calibração // Fase 01</span>
                </div>
                <h1 class="font-display-hero text-display-hero text-on-surface tracking-tight uppercase">
                  Escolha seu Motor
                </h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Selecione uma plataforma mecânica para iniciar a preparação. Calibre turbinas, dutos, limites estruturais e explore a potência com precisão cirúrgica.
                </p>
              </div>

              <div class="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-container-high/40 shadow-sm">
                <span class="material-symbols-outlined text-primary text-[20px]">tune</span>
                <span class="font-label-md text-label-md text-on-surface-variant uppercase">${e.length} Plataformas Disponíveis</span>
              </div>
            </div>

            <!-- Grid de Motores -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch">
              ${e.map(e=>this.htmlCardMotor(e)).join(``)}
            </div>

            <!-- Strip de Telemetria Inferior -->
            <div class="mt-space-xl pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-lowest/60 px-space-lg py-space-md rounded-xl border border-surface-container-high/30">
              <div class="flex items-center gap-space-md">
                <div class="flex items-center gap-space-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span class="font-label-sm text-label-sm uppercase text-on-surface">Modo Dinamômetro Pronto</span>
                </div>
                <span class="text-outline text-label-sm font-label-sm">•</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Firmware ECU v4.12 Nightfall</span>
              </div>
              <div class="font-label-sm text-label-sm text-outline tracking-wider">
                CAN-BUS TELEMETRY: <span class="text-primary font-mono font-semibold">0.4ms SYNC</span>
              </div>
            </div>

          </div>
        </div>
      </main>
      ${this.htmlFooter()}
    `,this.vincularEventosNavegacao(),this.app.querySelectorAll(`[data-action='preparar-motor']`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.index??`0`);this.controller.selecionarMotor(n),this.renderizarTuning()})})}htmlCardMotor(e){let t=e.pressaoBase>0,n=e.nome.toLowerCase().includes(`fusca`),r=V[e.index],i=e.limiteBase-e.potenciaBase;return`
      <div class="flex flex-col justify-between bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl border border-surface-container-high/40 transition-all duration-300 hover:shadow-[0_8px_32px_-4px_rgba(158,0,255,0.22)] hover:border-primary/40 group">
        
        <!-- Imagem ou Header Visual do Card -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-container-highest flex items-center justify-center">
          ${r?`<img src="${r}" alt="${e.nome}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />`:`
              <div class="w-full h-full bg-gradient-to-tr from-surface-container-lowest via-surface-container-high to-surface-container-lowest flex items-center justify-between px-space-lg">
                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary">${e.cilindros} Cilindros</span>
                  <span class="font-display-hero text-headline-xl text-on-surface/30 uppercase select-none">${e.cilindros} CIL</span>
                </div>
                <div class="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined text-[32px]">${t?`mode_fan`:`speed`}</span>
                </div>
              </div>
            `}
          
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
          
          <!-- Badges superiores -->
          <div class="absolute top-space-sm left-space-md flex items-center gap-space-xs">
            <span class="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm uppercase tracking-wider ${t?`text-primary`:`text-secondary`}">
              ${t?`Turbo Sobrealimentado`:`Aspirado Natural`}
            </span>
            ${n?`<span class="px-space-xs py-0.5 rounded bg-surface-container/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant">Refrigeração a Ar</span>`:``}
          </div>

          <!-- Nome e Potência sobrepostos -->
          <div class="absolute bottom-space-sm left-space-md right-space-md flex items-end justify-between">
            <div class="min-w-0 pr-2">
              <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight truncate">${e.nome}</h2>
            </div>
            <div class="text-right shrink-0">
              <span class="font-headline-xl text-headline-xl text-primary font-bold">${e.potenciaBase}</span>
              <span class="font-label-md text-label-md uppercase text-on-surface-variant ml-0.5">cv</span>
            </div>
          </div>
        </div>

        <!-- Especificações e Botão de Ação -->
        <div class="p-space-md flex flex-col justify-between flex-1 gap-space-md bg-surface-container-lowest">
          <div class="grid grid-cols-2 gap-space-xs py-space-xs px-space-md bg-surface-container-low rounded-lg border border-surface-container-high/30">
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm uppercase text-outline">Arquitetura</span>
              <span class="font-body-sm text-body-sm text-on-surface">${e.cilindros} cil · Limite ${e.limiteBase} cv</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm uppercase text-outline">Indução Base</span>
              <span class="font-body-sm text-body-sm text-on-surface">${t?`Turbo: ${e.pressaoBase} kg`:`Aspirado (0.0 kg)`}</span>
            </div>
          </div>

          <div class="flex items-center justify-between text-outline font-label-sm text-label-sm px-1">
            <span>Margem Segura:</span>
            <span class="text-primary font-mono font-semibold">+${i} cv disponíveis</span>
          </div>

          <button 
            data-action="preparar-motor" 
            data-index="${e.index}"
            class="w-full py-space-sm px-space-md rounded-xl bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider text-center flex items-center justify-center gap-space-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(158,0,255,0.45)] group/btn"
          >
            <span>Preparar Motor</span>
            <span class="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    `}renderizarTuning(){this.abaAtiva=`motores`;let e=this.controller.getEstadoMotor();if(!e){this.renderizarSelecaoMotor();return}let t=Math.min(e.potenciaAtual/e.limiteAtual*100,100),n=e.nome.toLowerCase().includes(`fusca`),r=V[e.index],i=e.pressaoTurbina;this.app.innerHTML=`
      ${this.htmlHeader()}
      <main class="w-full pt-16 bg-surface flex-1">
        <div class="max-w-7xl mx-auto px-gutter py-space-xl">
          <div class="flex flex-col w-full gap-space-xl">

            <!-- Barra Superior de Navegação & Ações Rápidas -->
            <section class="flex flex-col md:flex-row md:items-center justify-between gap-space-lg bg-surface-container-low px-space-lg py-space-md rounded-xl border border-surface-container-high/40 shadow-sm">
              <div class="flex items-center gap-space-md min-w-0">
                <button id="btn-voltar-selecao" class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
                  <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Voltar</span>
                </button>
                <div class="h-6 w-px bg-outline-variant/30 hidden sm:block"></div>
                
                <div class="flex items-center gap-space-md min-w-0">
                  <div class="relative w-14 h-10 rounded overflow-hidden flex-shrink-0 bg-surface-container-highest shadow-sm">
                    ${r?`<img src="${r}" alt="${e.nome}" class="w-full h-full object-cover" />`:`<div class="w-full h-full bg-primary-container/20 flex items-center justify-center text-primary font-bold text-xs">${e.cilindros}C</div>`}
                  </div>
                  <div class="min-w-0">
                    <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary block">Calibração Ativa // Bancada</span>
                    <h1 class="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">${e.nome}</h1>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-space-sm flex-wrap">
                <button id="btn-stats" class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[18px] text-primary">analytics</span>
                  <span>Estatísticas</span>
                </button>
                
                <button id="btn-resetar-motor" class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" title="Restaurar peças originais">
                  <span class="material-symbols-outlined text-[18px] text-outline">restart_alt</span>
                  <span>Resetar</span>
                </button>

                <button id="btn-abrir-salvar" class="flex items-center gap-space-xs px-space-lg py-space-sm bg-gradient-to-r from-tertiary-container via-primary-container to-primary hover:brightness-110 text-on-primary-container rounded font-headline-sm text-[13px] font-bold uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(158,0,255,0.35)] hover:shadow-[0_0_32px_rgba(158,0,255,0.6)]">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                  <span>Salvar na Garagem</span>
                </button>
              </div>
            </section>

            <!-- 4 Big Clean Stat Cards -->
            <section class="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
              
              <!-- Card 1: Potência -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Potência Atual</span>
                  <span class="material-symbols-outlined text-primary text-[20px]">bolt</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${Math.round(e.potenciaAtual)} <span class="font-label-md text-label-md text-primary font-normal">cv</span>
                  </div>
                  <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs">
                    Base: ${e.potenciaBase} cv (${e.potenciaAtual>=e.potenciaBase?`+`:``}${Math.round(e.potenciaAtual-e.potenciaBase)} cv)
                  </span>
                </div>
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>
              </div>

              <!-- Card 2: Limite Seguro -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Limite Seguro</span>
                  <span class="material-symbols-outlined text-secondary text-[20px]">speed</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${Math.round(e.limiteAtual)} <span class="font-label-md text-label-md text-secondary font-normal">cv</span>
                  </div>
                  <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs">
                    Teto mecânico do bloco
                  </span>
                </div>
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-container/10 rounded-full blur-xl pointer-events-none"></div>
              </div>

              <!-- Card 3: Cilindros -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Cilindros</span>
                  <span class="material-symbols-outlined text-on-surface-variant text-[20px]">view_column</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${e.cilindros} <span class="font-label-md text-label-md text-outline font-normal">cilindros</span>
                  </div>
                  <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs">
                    ${n?`Boxer 4 cilindros arrefecido a ar`:`Configuração em linha / bancada`}
                  </span>
                </div>
              </div>

              <!-- Card 4: Pressão da Turbina em Tempo Real -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border ${i.pressaoDelta>0?`border-primary/50 shadow-[0_4px_24px_rgba(158,0,255,0.18)]`:`border-surface-container-high/30`}">
                <div class="flex items-center justify-between mb-space-sm">
                  <div class="flex items-center gap-1.5">
                    <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Pressão do Turbo</span>
                    ${i.pressaoDelta>0?`<span class="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary font-mono text-[10px] font-bold">+${i.pressaoDelta.toFixed(1)} kg</span>`:i.temTurbina&&i.pressaoDelta===0?`<span class="px-1.5 py-0.2 rounded bg-surface-container text-outline font-mono text-[10px]">OEM</span>`:``}
                  </div>
                  <span class="material-symbols-outlined text-primary text-[20px] ${i.pressaoDelta>0?`animate-pulse`:``}">compress</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${i.pressaoAtual.toFixed(1)} <span class="font-label-md text-label-md text-primary font-normal">kg/cm²</span>
                  </div>
                  <span class="font-body-sm text-body-sm ${i.pressaoDelta>0?`text-primary font-medium`:`text-on-surface-variant`} block mt-space-xs">
                    ${i.descricao}
                  </span>
                </div>
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>
              </div>

            </section>

            <!-- Barra de Capacidade do Bloco -->
            <section class="bg-surface-container-low px-space-lg py-space-md rounded-xl shadow-sm border border-surface-container-high/30">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-sm">
                <div class="flex items-center gap-space-sm">
                  <span class="w-2 h-2 rounded-full ${t>=90?`bg-error animate-ping`:`bg-primary-container shadow-[0_0_8px_#9e00ff]`}"></span>
                  <span class="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                    Potência: ${Math.round(e.potenciaAtual)} cv <span class="text-outline font-normal">/ Limite: ${Math.round(e.limiteAtual)} cv</span>
                  </span>
                </div>
                <span class="font-label-sm text-label-sm ${t>=90?`text-error`:`text-primary`} uppercase tracking-wider font-semibold">
                  ${t.toFixed(1)}% da Carga Máxima Suportada
                </span>
              </div>
              <div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden p-0.5">
                <div 
                  class="h-full rounded-full transition-all duration-500 ${t>=90?`bg-gradient-to-r from-error to-error-container shadow-[0_0_16px_rgba(239,68,68,0.8)]`:`bg-gradient-to-r from-tertiary-container via-primary-container to-secondary shadow-[0_0_12px_rgba(158,0,255,0.7)]`}" 
                  style="width: ${t}%;"
                ></div>
              </div>
            </section>

            <!-- Matriz de Hardware (12 Slots) -->
            <section class="flex flex-col gap-space-md">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Matriz de Hardware</span>
                  <span class="font-label-sm text-label-sm px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-mono">12 Slots</span>
                </div>
                <span class="font-body-sm text-body-sm text-outline hidden sm:inline">Clique em qualquer slot disponível para abrir o catálogo e instalar upgrades</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md">
                ${Object.values(o).map(t=>this.htmlSlotHardware(t,e)).join(``)}
              </div>
            </section>

          </div>
        </div>
      </main>
      ${this.htmlFooter()}

      <!-- Modal de Catálogo de Peças (Lateral / Overlay) -->
      ${this.slotAberto?this.htmlModalCatalogo(this.slotAberto,e):``}

      <!-- Modal de Salvar na Garagem -->
      ${this.modalSalvarAberto?this.htmlModalSalvar(e):``}

      <!-- Modal de Estatísticas Gerais -->
      ${this.modalStatsAberto?this.htmlModalStats(e):``}

      <!-- Overlay de Motor Quebrado (caso tenha quebrado) -->
      ${e.quebrado?this.htmlOverlayQuebra(e):``}
    `,this.vincularEventosNavegacao(),this.vincularEventosTuning()}htmlSlotHardware(e,t){let n=B[e],r=t.pecas.get(e),i=r?.disponivel??!0,a=r?.estado??`original`,s=a===`modificada`;return i?a===`nao-instalada`?`
        <div 
          data-action="abrir-slot" 
          data-tipo="${e}"
          class="slot-card group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low p-space-lg rounded-xl transition-all duration-200 border border-dashed border-outline-variant/40 hover:border-primary/60 shadow-sm flex flex-col justify-between gap-space-md opacity-90 hover:opacity-100"
        >
          <div class="flex items-start justify-between gap-space-sm">
            <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">${n.numero}. ${n.label}</span>
            <span class="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-outline">
              <span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              Não instalada
            </span>
          </div>
          <div>
            <h3 class="font-headline-sm text-headline-sm text-outline group-hover:text-on-surface transition-colors">Slot Vazio</h3>
            <span class="font-body-sm text-body-sm text-outline-variant block mt-space-xs">
              ${e===o.Turbina?`Sem sobrealimentação (Aspirado)`:n.descPadrao}
            </span>
          </div>
          <div class="flex items-center justify-between pt-space-xs text-outline-variant group-hover:text-primary transition-colors">
            <span class="font-label-sm text-label-sm uppercase font-semibold">Adicionar Peça</span>
            <span class="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">add_circle</span>
          </div>
        </div>
      `:`
      <div 
        data-action="abrir-slot" 
        data-tipo="${e}"
        class="slot-card group cursor-pointer bg-surface-container-low hover:bg-surface-container p-space-lg rounded-xl transition-all duration-200 border ${s?`border-primary/40 hover:border-primary shadow-[0_4px_20px_rgba(158,0,255,0.12)]`:`border-surface-container-high/40 hover:border-outline-variant`} shadow-sm flex flex-col justify-between gap-space-md"
      >
        <div class="flex items-start justify-between gap-space-sm">
          <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">${n.numero}. ${n.label}</span>
          <span class="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded ${s?`bg-surface-container-highest text-secondary font-medium`:`bg-surface-container-high text-on-surface-variant`} font-label-sm text-label-sm">
            <span class="w-1.5 h-1.5 rounded-full ${s?`bg-primary-container shadow-[0_0_6px_#9e00ff]`:`bg-outline`}"></span>
            ${s?`Customizada`:`Original OEM`}
          </span>
        </div>
        <div>
          <h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
            ${r?.modelo||n.label}
          </h3>
          <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs line-clamp-1">
            ${r?.nome||n.descPadrao}
          </span>
          
          <!-- Indicação de pressão em tempo real específica no slot de Turbina -->
          ${e===o.Turbina&&t.pressaoTurbina.temTurbina?`
              <div class="flex items-center gap-1.5 mt-2 font-mono text-xs">
                <span class="text-primary font-bold">Pressão: ${t.pressaoTurbina.pressaoAtual.toFixed(1)} kg/cm²</span>
                ${t.pressaoTurbina.pressaoDelta>0?`<span class="text-secondary font-semibold">(+${t.pressaoTurbina.pressaoDelta.toFixed(1)} kg)</span>`:``}
              </div>
            `:``}
        </div>
        <div class="flex items-center justify-between pt-space-xs text-outline group-hover:text-on-surface transition-colors">
          <span class="font-label-sm text-label-sm uppercase">Editar Slot</span>
          <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
        </div>
      </div>
    `:`
        <div class="p-space-lg rounded-xl bg-surface-container-lowest/50 border border-outline-variant/20 flex flex-col justify-between gap-space-md opacity-40 cursor-not-allowed select-none">
          <div class="flex items-start justify-between gap-space-sm">
            <span class="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">${n.numero}. ${n.label}</span>
            <span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-outline-variant">
              Incompatível
            </span>
          </div>
          <div>
            <h3 class="font-headline-sm text-headline-sm text-outline-variant">Não Aplicável</h3>
            <span class="font-body-sm text-body-sm text-outline-variant block mt-space-xs">${r?.motivoIndisponivel||`Refrigeração a Ar`}</span>
          </div>
          <div class="flex items-center gap-1 text-outline-variant font-label-sm text-label-sm pt-space-xs">
            <span class="material-symbols-outlined text-[16px]">block</span>
            <span>Bloqueado de Fábrica</span>
          </div>
        </div>
      `}htmlModalCatalogo(e,t){let n=B[e],r=t.pecas.get(e),i=this.controller.getPecasPorTipo(e),a=t.nome.toLowerCase().includes(`fusca`)||r?.estado===`nao-instalada`;return`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl animate-modal" id="modal-catalogo-overlay">
        <div class="bg-surface-container-low max-w-3xl w-full max-h-[90vh] p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-surface-container-high/60 overflow-hidden">
          
          <!-- Header do Catálogo -->
          <div class="flex items-center justify-between border-b border-surface-container-high/40 pb-space-md">
            <div>
              <div class="flex items-center gap-space-xs">
                <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Slot ${n.numero}</span>
                <span class="text-outline-variant font-label-sm">•</span>
                <span class="font-label-sm text-label-sm text-outline">${t.nome}</span>
                ${e===o.Turbina?`<span class="text-outline-variant font-label-sm">•</span><span class="font-label-sm text-label-sm text-primary font-mono">Pressão Atual: ${t.pressaoTurbina.pressaoAtual.toFixed(1)} kg</span>`:``}
              </div>
              <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
                Catálogo — ${n.label}
              </h2>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Peça atual instalada: <span class="text-primary font-semibold">${r?.modelo||`Não Instalada`}</span>
                ${r?.estado===`modificada`?`<span class="ml-1 text-[11px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">Customizada</span>`:``}
              </p>
            </div>
            
            <button id="btn-fechar-catalogo" class="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors" title="Fechar">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <!-- Lista de Peças do Catálogo -->
          <div class="flex-1 overflow-y-auto pr-1 flex flex-col gap-space-md" id="lista-pecas-catalogo">
            
            <!-- Opção: Restaurar Original OEM -->
            <div class="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-container-high/50 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md transition-all">
              <div class="flex items-start gap-space-md">
                <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-outline shrink-0">
                  <span class="material-symbols-outlined text-[22px]">factory</span>
                </div>
                <div>
                  <div class="flex items-center gap-space-xs mb-0.5">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-mono">Fábrica OEM</span>
                  </div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface">Peça Original OEM</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">
                    ${e===o.Turbina&&t.pressaoBase>0?`Restaura a turbina de fábrica com pressão original de ${t.pressaoBase.toFixed(1)} kg/cm².`:`Restaura a calibração e tolerância original de fábrica deste slot.`}
                  </p>
                </div>
              </div>
              <button 
                data-action="instalar-original" 
                data-tipo="${e}"
                class="px-space-lg py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md tracking-wider uppercase transition-all shrink-0 ${r?.estado===`original`?`opacity-50 cursor-default`:``}"
                ${r?.estado===`original`?`disabled`:``}
              >
                ${r?.estado===`original`?`Instalada`:`Restaurar OEM`}
              </button>
            </div>

            <!-- Opção de Desinstalar (deixar vazio) caso aplicável -->
            ${a?`
                <div class="p-space-md rounded-xl bg-surface-container/60 hover:bg-surface-container-high border border-dashed border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md transition-all">
                  <div class="flex items-start gap-space-md">
                    <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-outline-variant shrink-0">
                      <span class="material-symbols-outlined text-[22px]">remove_circle_outline</span>
                    </div>
                    <div>
                      <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant font-mono">Sem Peça</span>
                      <h3 class="font-headline-sm text-headline-sm text-outline">Não Instalada (Slot Vazio)</h3>
                      <p class="font-body-sm text-body-sm text-outline-variant">
                        ${e===o.Turbina?`Remove o turbocompressor, deixando o motor operando como aspirado natural (0.0 kg/cm²).`:`Remove qualquer componente deste slot (como original de fábrica no Fusca).`}
                      </p>
                    </div>
                  </div>
                  <button 
                    data-action="desinstalar-peca" 
                    data-tipo="${e}"
                    class="px-space-lg py-space-sm rounded-lg bg-surface-container hover:bg-surface-bright text-outline hover:text-on-surface font-label-md text-label-md tracking-wider uppercase transition-all shrink-0 ${r?.estado===`nao-instalada`?`opacity-50 cursor-default`:``}"
                    ${r?.estado===`nao-instalada`?`disabled`:``}
                  >
                    ${r?.estado===`nao-instalada`?`Vazio`:`Remover Peça`}
                  </button>
                </div>
              `:``}

            <!-- Peças Disponíveis no Catálogo -->
            ${i.map((t,i)=>{let a=this.controller.calcularBonusPeca(e,t),s=r?.modelo===t.getModelo();return`
                  <div class="group relative rounded-xl p-space-md transition-all duration-300 flex flex-col justify-between gap-space-md border ${s?`bg-surface-container border-secondary/60 shadow-[0_4px_24px_rgba(158,0,255,0.18)]`:a.riscoQuebra?`bg-surface-container-low hover:bg-surface-container border-error/40 hover:border-error`:`bg-surface-container-low hover:bg-surface-container border-surface-container-high/40 hover:border-primary/40`}">
                    
                    ${s?`<div class="absolute left-0 top-3 bottom-3 w-1 bg-secondary rounded-r"></div>`:``}

                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
                      <div class="flex gap-space-md">
                        <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0 ${a.riscoQuebra?`text-error`:s?`text-secondary`:`text-primary`}">
                          <span class="material-symbols-outlined text-[28px]">${a.riscoQuebra?`warning`:n.icone}</span>
                        </div>
                        
                        <div class="flex flex-col">
                          <div class="flex items-center gap-space-sm mb-1 flex-wrap">
                            <span class="font-label-sm text-label-sm font-mono tracking-widest uppercase ${a.riscoQuebra?`text-error`:s?`text-secondary`:`text-primary`}">
                              ${t.getNome()}
                            </span>
                            ${e===o.Turbina&&a.pressaoTurbina!==void 0?`<span class="px-2 py-0.2 rounded bg-primary/20 text-primary font-mono text-[11px] font-bold">
                                    Pressão: ${a.pressaoTurbina.toFixed(1)} kg/cm²
                                   </span>`:``}
                            ${a.riscoQuebra?`<span class="px-1.5 py-0.2 rounded bg-error/20 text-error font-label-sm text-[10px] font-bold uppercase tracking-wider">⚠️ Risco de Quebra</span>`:``}
                          </div>
                          
                          <h3 class="font-headline-md text-headline-md text-on-surface tracking-tight">${t.getModelo()}</h3>
                          <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xl">${t.getDescricao()}</p>
                        </div>
                      </div>

                      <!-- Pill de Performance / Bônus em % e CV -->
                      <div class="flex md:flex-col items-end justify-between shrink-0 bg-surface-container-lowest px-space-md py-space-sm rounded-lg border border-surface-container-high/30">
                        <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          ${e===o.Turbina?`Pressão & Desempenho`:`Bônus de Desempenho`}
                        </span>
                        
                        ${e===o.Turbina&&a.pressaoTurbina!==void 0?`
                            <div class="flex items-baseline gap-1 mt-0.5">
                              <span class="font-headline-sm text-headline-sm font-bold text-primary font-mono">${a.pressaoTurbina.toFixed(1)} kg/cm²</span>
                              ${a.pressaoDelta!==void 0&&a.pressaoDelta>0?`<span class="font-label-sm text-label-sm text-secondary font-bold font-mono">(+${a.pressaoDelta.toFixed(1)} kg)</span>`:a.pressaoDelta===0?`<span class="font-label-sm text-label-sm text-outline font-mono">(OEM)</span>`:`<span class="font-label-sm text-label-sm text-outline font-mono">(${a.pressaoDelta?.toFixed(1)} kg)</span>`}
                            </div>
                          `:`
                            <div class="flex items-baseline gap-1 mt-0.5">
                              ${a.percentualPotencia>0?`<span class="font-headline-sm text-headline-sm font-bold text-primary">+${a.percentualPotencia}%</span>`:``}
                              ${a.percentualLimite>0?`<span class="font-headline-sm text-headline-sm font-bold text-secondary">+${a.percentualLimite}% Lim</span>`:``}
                            </div>
                          `}

                        <span class="font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5">
                          ${a.textoResumo}
                        </span>
                        <span class="font-label-sm text-label-sm text-outline font-mono mt-1">
                          Est: ${a.potenciaEstimada} cv / Lim: ${a.limiteEstimado} cv
                        </span>
                      </div>
                    </div>

                    <!-- Rodapé do Card com Ação -->
                    <div class="flex items-center justify-between pt-space-xs border-t border-surface-container-high/30">
                      <div class="flex items-center gap-space-md text-outline font-label-sm text-label-sm">
                        <span class="font-mono text-on-surface-variant">${a.textoResumo}</span>
                      </div>

                      <button 
                        data-action="instalar-peca-catalogo" 
                        data-tipo="${e}" 
                        data-indice="${i}"
                        class="px-space-lg py-space-sm rounded-lg font-label-md text-label-md tracking-wider uppercase transition-all shadow-sm ${s?`bg-secondary/20 text-secondary cursor-default`:a.riscoQuebra?`bg-error-container hover:brightness-120 text-on-error-container glow-red font-bold`:`bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface`}"
                        ${s?`disabled`:``}
                      >
                        ${s?`✓ Instalada`:a.riscoQuebra?`Testar Limite (Risco)`:`Instalar`}
                      </button>
                    </div>

                  </div>
                `}).join(``)}

          </div>

          <div class="flex items-center justify-end border-t border-surface-container-high/40 pt-space-md">
            <button id="btn-fechar-catalogo-footer" class="px-space-lg py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
              Fechar Catálogo
            </button>
          </div>

        </div>
      </div>
    `}htmlModalSalvar(e){let t=e.pressaoTurbina;return`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl animate-modal" id="modal-salvar-overlay">
        <div class="bg-surface-container-low max-w-md w-full p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-surface-container-high/60">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Oficina Privada</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase">Salvar Preparação</h2>
            </div>
            <button id="btn-fechar-salvar" class="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="space-y-space-md">
            <p class="font-body-md text-body-md text-on-surface-variant">
              Sua configuração de <strong class="text-on-surface">${e.nome}</strong> está com <strong class="text-primary font-mono">${Math.round(e.potenciaAtual)} cv</strong> e <strong class="text-primary font-mono">${t.pressaoAtual.toFixed(1)} kg de turbo</strong>. Dê um nome para este projeto:
            </p>

            <div class="space-y-1">
              <label for="input-nome-build" class="font-label-sm text-label-sm uppercase text-outline">Nome do Projeto</label>
              <input 
                id="input-nome-build" 
                type="text" 
                value="${e.nome} Stage 1" 
                placeholder="Ex: Fusca Turbo 3kg Monstro" 
                class="w-full px-space-md py-space-sm rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none text-on-surface font-body-md"
              />
            </div>

            <div class="bg-surface-container p-space-md rounded-lg text-outline font-label-sm text-label-sm space-y-1">
              <div>Potência final: <span class="text-primary font-bold font-mono">${Math.round(e.potenciaAtual)} cv</span></div>
              <div>Pressão do turbo: <span class="text-primary font-bold font-mono">${t.pressaoAtual.toFixed(1)} kg/cm²</span> <span class="text-xs">(${t.descricao})</span></div>
              <div>Limite seguro: <span class="text-secondary font-bold font-mono">${Math.round(e.limiteAtual)} cv</span></div>
              <div>Carga: <span class="text-on-surface font-mono">${(e.potenciaAtual/e.limiteAtual*100).toFixed(1)}%</span></div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container-high/40">
            <button id="btn-cancelar-salvar" class="px-space-lg py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
              Cancelar
            </button>
            <button id="btn-confirmar-salvar" class="px-space-lg py-space-sm bg-primary-container hover:bg-secondary-container text-on-primary-container rounded font-label-md text-label-md uppercase font-semibold tracking-wider transition-all shadow-[0_0_20px_rgba(158,0,255,0.4)]">
              Confirmar & Salvar
            </button>
          </div>
        </div>
      </div>
    `}htmlModalStats(e){let t=(e.potenciaAtual/e.limiteAtual*100).toFixed(1),n=Math.round(e.potenciaAtual-e.potenciaBase),r=e.pressaoTurbina;return`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl animate-modal" id="modal-stats-overlay">
        <div class="bg-surface-container-low max-w-xl w-full p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-surface-container-high/60">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Diagnóstico Dinâmico</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface">Estatísticas do Conjunto</h2>
            </div>
            <button id="btn-fechar-stats" class="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-space-md">
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Carga Estrutural</span>
              <span class="font-display-hero text-headline-lg text-on-surface font-mono">${t}%</span>
              <span class="font-body-sm text-body-sm text-primary block mt-1">${n>=0?`+${n} cv líquido`:`${n} cv`}</span>
            </div>
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Margem de Ruptura</span>
              <span class="font-display-hero text-headline-lg text-on-surface font-mono">${Math.max(0,Math.round(e.limiteAtual-e.potenciaAtual))} cv</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant block mt-1">Margem até fadiga</span>
            </div>
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Pressão de Turbina</span>
              <span class="font-display-hero text-headline-lg text-primary font-mono">${r.pressaoAtual.toFixed(1)} kg</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant block mt-1">${r.descricao}</span>
            </div>
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Limite de Bloco</span>
              <span class="font-display-hero text-headline-lg text-on-surface font-mono">${Math.round(e.limiteAtual)} cv</span>
              <span class="font-body-sm text-body-sm text-secondary block mt-1">Base original: ${e.limiteBase} cv</span>
            </div>
          </div>

          <div class="bg-surface-container p-space-md rounded-lg flex items-center justify-between border border-surface-container-high/40">
            <div>
              <span class="font-label-sm text-label-sm text-outline block uppercase">Homologação da Bancada</span>
              <span class="font-body-md text-body-md text-on-surface font-semibold">Tuning Pronto para Validação de Pista</span>
            </div>
            <span class="material-symbols-outlined text-primary text-[28px]">check_circle</span>
          </div>

          <button id="btn-fechar-stats-footer" class="w-full py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
            Fechar Resumo
          </button>
        </div>
      </div>
    `}htmlOverlayQuebra(e){return`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/90 backdrop-blur-2xl animate-modal" id="overlay-quebra">
        <div class="bg-surface-container-low max-w-lg w-full p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-error/50 broken-glow text-center">
          <div class="w-20 h-20 rounded-full bg-error-container/40 text-error flex items-center justify-center mx-auto shadow-lg">
            <span class="material-symbols-outlined text-[44px]">explosion</span>
          </div>

          <div>
            <span class="font-label-sm text-label-sm uppercase tracking-widest text-error font-mono font-bold">FALHA MECÂNICA CATASTRÓFICA</span>
            <h2 class="font-headline-xl text-headline-xl text-on-surface uppercase mt-1">Motor Fundido!</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-sm mx-auto">
              ${e.mensagemQuebra}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-space-sm py-space-md px-space-lg bg-surface-container-lowest rounded-xl border border-error/30 text-left">
            <div>
              <span class="font-label-sm text-label-sm text-outline uppercase block">Potência no Pico</span>
              <span class="font-display-hero text-headline-lg text-error font-bold font-mono">${e.potenciaFinalQuebra} cv</span>
            </div>
            <div>
              <span class="font-label-sm text-label-sm text-outline uppercase block">Limite Suportado</span>
              <span class="font-display-hero text-headline-lg text-secondary font-bold font-mono">${Math.round(e.limiteAtual)} cv</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-space-sm pt-space-xs">
            <button id="btn-resetar-apos-quebra" class="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-error hover:brightness-110 text-on-error font-headline-sm text-headline-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.45)]">
              🔄 Reconstruir Motor
            </button>
            <button id="btn-voltar-apos-quebra" class="w-full sm:w-auto px-space-lg py-space-md rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all">
              ← Escolher Outro Motor
            </button>
          </div>
        </div>
      </div>
    `}renderizarMeusMotores(){this.abaAtiva=`meus-motores`;let e=this.controller.getMotoresSalvos();this.app.innerHTML=`
      ${this.htmlHeader()}
      <main class="w-full pt-16 bg-surface flex-1">
        <div class="max-w-7xl mx-auto px-gutter py-space-xl">
          <div class="flex flex-col w-full">

            <!-- Micro-Strip de Status -->
            <div class="w-full flex items-center justify-between pb-space-lg">
              <div class="flex items-center gap-space-sm">
                <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#9e00ff]"></span>
                <span class="font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant font-mono">ECU Profile Sync // Garagem Pessoal</span>
              </div>
              <div class="font-label-sm text-label-sm uppercase tracking-widest text-outline font-mono">
                Preparações Salvas: <span class="text-primary font-semibold">${e.length}</span>
              </div>
            </div>

            <!-- Header da Garagem -->
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
              <div>
                <p class="font-label-md text-label-md tracking-wider uppercase text-primary mb-space-xs font-mono">Oficina Privada</p>
                <h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight uppercase">Meus Motores</h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
                  Suas preparações personalizadas salvas. Retome qualquer calibração ou teste novos limites.
                </p>
              </div>

              <div class="flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-xl border border-surface-container-high/40">
                <span class="px-space-md py-space-xs bg-surface-container-high text-on-surface rounded font-label-sm text-label-sm tracking-wider uppercase shadow-sm">
                  Projetos (${e.length})
                </span>
              </div>
            </div>

            <!-- Grid de Motores Salvos -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
              
              ${e.length===0?`
                  <div class="lg:col-span-12 p-space-xl bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/40 text-center flex flex-col items-center justify-center gap-space-md py-16">
                    <div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                      <span class="material-symbols-outlined text-[32px]">garage</span>
                    </div>
                    <div>
                      <h3 class="font-headline-md text-headline-md text-on-surface uppercase">Sua garagem está vazia</h3>
                      <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-md">
                        Nenhum motor customizado foi salvo ainda. Selecione um motor, instale peças de performance e clique em "Salvar na Garagem".
                      </p>
                    </div>
                    <button id="btn-ir-escolher-motor" class="px-space-xl py-space-md rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_24px_rgba(158,0,255,0.4)]">
                      Começar Novo Projeto
                    </button>
                  </div>
                `:e.map((e,t)=>this.htmlCardBuildSalvo(e,t)).join(``)}

              <!-- Card de Montar Nova Preparação (sempre visível ao final) -->
              <div class="lg:col-span-12 relative flex flex-col md:flex-row items-center justify-between p-space-xl bg-surface-container-lowest rounded-xl shadow-lg group overflow-hidden mt-space-sm transition-all duration-300 hover:bg-surface-container-low border border-surface-container-high/40">
                <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/10 blur-3xl pointer-events-none rounded-full"></div>

                <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-space-lg mb-space-lg md:mb-0">
                  <div class="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300 shadow-md">
                    <span class="material-symbols-outlined text-[32px]">add</span>
                  </div>
                  <div>
                    <div class="flex items-center gap-space-xs mb-1">
                      <span class="font-label-sm text-label-sm text-primary tracking-widest uppercase font-mono">Bancada Livre</span>
                      <span class="w-1 h-1 rounded-full bg-outline"></span>
                      <span class="font-label-sm text-label-sm text-outline">Slot Disponível</span>
                    </div>
                    <h3 class="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">
                      Montar Nova Preparação
                    </h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                      Selecione um motor de fábrica virgem e inicie uma nova montagem na bancada de calibração.
                    </p>
                  </div>
                </div>

                <div class="relative z-10 w-full md:w-auto flex-shrink-0">
                  <button id="btn-garagem-explorar" class="w-full md:w-auto inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md bg-surface-container-high hover:bg-surface-bright text-on-surface hover:text-primary font-headline-sm text-headline-sm uppercase tracking-wider font-bold rounded shadow-sm transition-all duration-200">
                    <span class="material-symbols-outlined text-[20px]">swap_driving_apps_wheel</span>
                    <span>Explorar Motores</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Rodapé de Calibração -->
            <div class="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm text-outline font-label-sm text-label-sm">
              <div class="flex items-center gap-space-sm">
                <span class="material-symbols-outlined text-primary text-[16px]">verified</span>
                <span>TODOS OS MAPAS SALVOS COM EQUILÍBRIO ESTEQUIOMÉTRICO VALIDADO (AFR 11.8:1 A WOT)</span>
              </div>
              <div class="tracking-widest uppercase font-mono">
                GARAGE BUILD v4.8.2-PROD
              </div>
            </div>

          </div>
        </div>
      </main>
      ${this.htmlFooter()}
    `,this.vincularEventosNavegacao(),this.vincularEventosGaragem()}htmlCardBuildSalvo(e,t){let n=V[e.motorIndex],r=Math.min(e.potenciaFinal/e.limiteFinal*100,100).toFixed(1);return`
      <div class="lg:col-span-6 group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_8px_32px_-4px_rgba(158,0,255,0.18)] border border-surface-container-high/40">
        
        <!-- Header Visual do Projeto -->
        <div class="relative w-full h-64 sm:h-72 overflow-hidden bg-surface-container-high flex items-center justify-center">
          ${n?`<img src="${n}" alt="${e.nomePersonalizado}" class="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105" />`:`
              <div class="w-full h-full bg-gradient-to-tr from-surface-container-lowest via-surface-container-high to-surface-container-lowest flex items-center justify-between px-space-lg">
                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Projeto #${t+1}</span>
                  <span class="font-display-hero text-headline-xl text-on-surface/20 uppercase select-none">${e.cilindros} CIL</span>
                </div>
                <div class="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined text-[36px]">tune</span>
                </div>
              </div>
            `}
          
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/60 via-transparent to-transparent"></div>

          <!-- Badges de topo -->
          <div class="absolute top-space-md left-space-md right-space-md flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-sm text-label-sm tracking-wider uppercase rounded">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Configuração Salva
            </span>
            <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high/80 backdrop-blur-md px-space-sm py-1 rounded font-mono">
              ${e.dataCriacao}
            </span>
          </div>

          <!-- Identidade Sobreposta -->
          <div class="absolute bottom-space-md left-space-lg right-space-lg">
            <span class="font-label-sm text-label-sm text-primary tracking-widest uppercase font-mono">${e.motorOriginalNome}</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight uppercase truncate">
              ${e.nomePersonalizado}
            </h2>
          </div>
        </div>

        <!-- Métricas & Peças Instaladas -->
        <div class="p-space-lg flex-1 flex flex-col justify-between space-y-space-lg bg-surface-container-lowest">
          
          <!-- Painel de Potência & Pressão -->
          <div class="bg-surface-container-low p-space-md rounded-lg flex items-end justify-between border border-surface-container-high/30">
            <div>
              <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Potência Calibrada</span>
              <div class="flex items-baseline gap-1 mt-space-xs">
                <span class="font-display-hero text-headline-xl text-on-surface font-extrabold tracking-tight">${e.potenciaFinal}</span>
                <span class="font-label-md text-label-md text-primary font-bold">cv</span>
              </div>
            </div>
            
            <div class="text-center">
              <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Pressão Turbo</span>
              <div class="mt-space-xs font-mono font-bold text-primary text-lg">
                ${e.pressaoFinal!==void 0&&e.pressaoFinal>0?`${e.pressaoFinal.toFixed(1)} kg`:`0.0 kg`}
              </div>
            </div>

            <div class="text-right">
              <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Teto Térmico</span>
              <div class="flex items-center justify-end gap-1.5 mt-space-xs">
                <span class="font-label-md text-label-md text-on-surface-variant">Limite:</span>
                <span class="font-label-lg text-label-lg text-on-surface font-semibold font-mono">${e.limiteFinal} cv</span>
              </div>
            </div>
          </div>

          <!-- Barra de Carga -->
          <div class="space-y-space-xs">
            <div class="flex justify-between font-label-sm text-label-sm text-outline">
              <span>Carga Estrutural</span>
              <span class="text-primary font-medium font-mono">${r}% Utilizado</span>
            </div>
            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-container to-primary rounded-full" style="width: ${r}%;"></div>
            </div>
          </div>

          <!-- Resumo de Peças Customizadas -->
          <div class="bg-surface-container-low/60 rounded-lg p-space-md border border-surface-container-high/20">
            <div class="flex items-center gap-space-xs mb-space-sm">
              <span class="material-symbols-outlined text-primary text-[18px]">build</span>
              <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                ${e.pecasCustomizadasNomes.length} upgrades instalados
              </span>
            </div>
            <div class="flex flex-wrap gap-space-xs max-h-20 overflow-y-auto">
              ${e.pecasCustomizadasNomes.length>0?e.pecasCustomizadasNomes.map(e=>`<span class="px-space-sm py-0.5 bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] rounded">${e}</span>`).join(``):`<span class="text-outline font-body-sm text-xs">Nenhuma peça após o padrão original</span>`}
            </div>
          </div>

          <!-- Ações do Card -->
          <div class="flex items-center gap-space-sm pt-space-xs">
            <button 
              data-action="carregar-build" 
              data-id="${e.id}"
              class="flex-1 py-space-md px-space-lg rounded bg-gradient-to-r from-on-primary to-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider font-bold text-center shadow-md transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(158,0,255,0.45)] flex items-center justify-center gap-space-sm"
            >
              <span>Carregar na Bancada</span>
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <button 
              data-action="excluir-build" 
              data-id="${e.id}"
              class="w-12 h-12 rounded bg-surface-container-high hover:bg-error-container/40 text-outline hover:text-error flex items-center justify-center transition-colors"
              title="Excluir este projeto"
            >
              <span class="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

        </div>
      </div>
    `}vincularEventosNavegacao(){document.getElementById(`nav-logo`)?.addEventListener(`click`,()=>{this.renderizarSelecaoMotor()}),document.getElementById(`tab-motores`)?.addEventListener(`click`,()=>{this.controller.temMotorSelecionado()?this.renderizarTuning():this.renderizarSelecaoMotor()}),document.getElementById(`tab-meus-motores`)?.addEventListener(`click`,()=>{this.renderizarMeusMotores()})}vincularEventosTuning(){document.getElementById(`btn-voltar-selecao`)?.addEventListener(`click`,()=>{this.renderizarSelecaoMotor()}),document.getElementById(`btn-resetar-motor`)?.addEventListener(`click`,()=>{this.controller.resetarMotor(),this.renderizarTuning()}),document.getElementById(`btn-abrir-salvar`)?.addEventListener(`click`,()=>{this.modalSalvarAberto=!0,this.renderizarTuning()}),document.getElementById(`btn-stats`)?.addEventListener(`click`,()=>{this.modalStatsAberto=!0,this.renderizarTuning()}),this.app.querySelectorAll(`[data-action='abrir-slot']`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tipo;this.slotAberto=t,this.renderizarTuning()})});let e=()=>{this.slotAberto=null,this.renderizarTuning()};document.getElementById(`btn-fechar-catalogo`)?.addEventListener(`click`,e),document.getElementById(`btn-fechar-catalogo-footer`)?.addEventListener(`click`,e),document.getElementById(`modal-catalogo-overlay`)?.addEventListener(`click`,t=>{t.target.id===`modal-catalogo-overlay`&&e()}),this.app.querySelectorAll(`[data-action='instalar-peca-catalogo']`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tipo,n=parseInt(e.dataset.indice??`0`);this.controller.instalarPeca(t,n),this.slotAberto=null,this.renderizarTuning()})}),this.app.querySelectorAll(`[data-action='instalar-original']`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tipo;this.controller.restaurarOriginal(t),this.slotAberto=null,this.renderizarTuning()})}),this.app.querySelectorAll(`[data-action='desinstalar-peca']`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tipo;this.controller.desinstalarPeca(t),this.slotAberto=null,this.renderizarTuning()})});let t=()=>{this.modalSalvarAberto=!1,this.renderizarTuning()};document.getElementById(`btn-fechar-salvar`)?.addEventListener(`click`,t),document.getElementById(`btn-cancelar-salvar`)?.addEventListener(`click`,t),document.getElementById(`modal-salvar-overlay`)?.addEventListener(`click`,e=>{e.target.id===`modal-salvar-overlay`&&t()}),document.getElementById(`btn-confirmar-salvar`)?.addEventListener(`click`,()=>{let e=document.getElementById(`input-nome-build`),t=e?e.value:``;this.controller.salvarMotorAtual(t),this.modalSalvarAberto=!1,this.renderizarMeusMotores()});let n=()=>{this.modalStatsAberto=!1,this.renderizarTuning()};document.getElementById(`btn-fechar-stats`)?.addEventListener(`click`,n),document.getElementById(`btn-fechar-stats-footer`)?.addEventListener(`click`,n),document.getElementById(`modal-stats-overlay`)?.addEventListener(`click`,e=>{e.target.id===`modal-stats-overlay`&&n()}),document.getElementById(`btn-resetar-apos-quebra`)?.addEventListener(`click`,()=>{this.controller.resetarMotor(),this.renderizarTuning()}),document.getElementById(`btn-voltar-apos-quebra`)?.addEventListener(`click`,()=>{this.renderizarSelecaoMotor()})}vincularEventosGaragem(){document.getElementById(`btn-ir-escolher-motor`)?.addEventListener(`click`,()=>{this.renderizarSelecaoMotor()}),document.getElementById(`btn-garagem-explorar`)?.addEventListener(`click`,()=>{this.renderizarSelecaoMotor()}),this.app.querySelectorAll(`[data-action='carregar-build']`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id??``;this.controller.carregarMotorSalvo(t)&&this.renderizarTuning()})}),this.app.querySelectorAll(`[data-action='excluir-build']`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id??``;confirm(`Deseja realmente remover esta preparação da sua garagem?`)&&(this.controller.excluirMotorSalvo(t),this.renderizarMeusMotores())})})}}})),W=e((()=>{}));t((()=>{z(),U(),W();var e=new R,t=document.getElementById(`app`);new H(e,t).renderizarSelecaoMotor()}))();