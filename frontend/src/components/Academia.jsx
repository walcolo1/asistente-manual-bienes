// Academia.jsx
// Componente de la Academia / Aula Virtual del Manual de Bienes.
// Implementa tomas físicas de los 7 capítulos, glosarios, casos prácticos, evaluaciones y comprobantes.

import React, { useState, useEffect } from 'react';
import { academyData } from '../data/academyData';
import { formatMarkdown, formatInlineMarkdown } from '../utils/parser';

// Iconos SVG reutilizables de Lucide en formato puro
const icons = {
  bookOpen: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  award: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z',
  alert: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  check: 'M5 13l4 4L19 7',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  arrowLeft: 'M10 19l-7-7m0 0l7-7m-7 7h18',
  arrowRight: 'M14 5l7 7m0 0l-7 7m7-7H3',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5L19 8.5V19a2 2 0 01-2 2z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  lock: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  cap: 'M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-3.5v3a1.5 1.5 0 003 0v-3'
};

const Icon = ({ name, size = 16, className = '' }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[name]} />
  </svg>
);

export default function Academia() {
  // ── Estados Principales ──
  const [student, setStudent] = useState(() => {
    try {
      const stored = localStorage.getItem('manualBienes.student');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeChapterId, setActiveChapterId] = useState(null);
  const [chapterTab, setChapterTab] = useState('ruta'); // ruta, desarrollo, procesos, documentos, resumen, practica, evaluacion
  const [loadingStudyPlan, setLoadingStudyPlan] = useState(false);
  const [selectedModule, setSelectedModule] = useState("Curso Completo");

  // Estados de la Evaluación
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizApproved, setQuizApproved] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showReviewScreen, setShowReviewScreen] = useState(false);

  // Notas / Trazabilidad
  const [scores, setScores] = useState(() => {
    try {
      const stored = localStorage.getItem('manualBienes.scores');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  // Visibilidad de Solución Práctica
  const [revealSolution, setRevealSolution] = useState(false);

  // Comprobante
  const [showCertificate, setShowCertificate] = useState(false);
  const [certChapter, setCertChapter] = useState(null);

  // ── Manejo de Formularios de Login ──
  const [nameInput, setNameInput] = useState('');
  const [gradeInput, setGradeInput] = useState('Soldado');
  const [idInput, setIdInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [unitInput, setUnitInput] = useState('');
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!nameInput.trim() || nameInput.trim().length < 3) {
      newErrors.name = 'Por favor, ingrese su nombre (mínimo 3 caracteres)';
    }
    if (!idInput.trim() || !/^\d{5,15}$/.test(idInput.trim())) {
      newErrors.id = 'Ingrese una cédula de ciudadanía válida (solo números, 5-15 dígitos)';
    }
    if (!emailInput.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }
    if (!unitInput.trim()) {
      newErrors.unit = 'Ingrese la Unidad Ejecutora del Ministerio de Defensa';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const studentData = {
      name: nameInput.trim(),
      grade: gradeInput,
      id: idInput.trim(),
      email: emailInput.trim(),
      unit: unitInput.trim()
    };

    setStudent(studentData);
    localStorage.setItem('manualBienes.student', JSON.stringify(studentData));
  };

  const handleLogout = () => {
    setStudent(null);
    setActiveChapterId(null);
    localStorage.removeItem('manualBienes.student');
  };

  // ── Generar Plan de Estudio ──
  const handleGeneratePlan = (chapterId) => {
    setLoadingStudyPlan(true);
    setTimeout(() => {
      setActiveChapterId(chapterId);
      setChapterTab('ruta');
      setRevealSolution(false);
      setQuizSubmitted(false);
      setQuizSelectedAnswers({});
      setQuizScore(0);
      setQuizApproved(false);
      setCurrentQuestionIndex(0);
      setShowReviewScreen(false);
      setLoadingStudyPlan(false);
      
      // Preparar 15 preguntas aleatorias del banco de este capítulo
      const currentChapter = academyData.chapters.find(c => c.id === chapterId);
      if (currentChapter && currentChapter.bancoPreguntas) {
        // Barajar preguntas
        const shuffled = [...currentChapter.bancoPreguntas].sort(() => 0.5 - Math.random());
        // Tomar hasta 15 preguntas (o el total si el banco tiene menos, pero nuestros bancos tienen exactamente 20)
        const selected = shuffled.slice(0, 15).map(q => {
          // Guardar el índice correcto original
          const correctOptionText = q.options[q.correct];
          // Barajar opciones
          const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
          const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);
          return {
            question: q.question,
            options: shuffledOptions,
            correct: newCorrectIndex,
            feedback: q.feedback
          };
        });
        setQuizQuestions(selected);
      }
    }, 1200);
  };

  // ── Manejo de Quizzes de Evaluación ──
  const handleSelectOption = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    setQuizSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(quizSelectedAnswers).length;
    if (answeredCount < quizQuestions.length) {
      alert(`Por favor, responda todas las ${quizQuestions.length} preguntas antes de enviar.`);
      return;
    }

    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizSelectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const finalPercentage = Math.round((correctCount / quizQuestions.length) * 100);
    const approved = correctCount >= 13; // Se aprueba con más del 80% (mínimo 13 respuestas correctas de 15, ya que 12/15 = 80%)

    setQuizScore(finalPercentage);
    setQuizApproved(approved);
    setQuizSubmitted(true);

    if (approved) {
      const updatedScores = {
        ...scores,
        [activeChapterId]: finalPercentage
      };
      setScores(updatedScores);
      localStorage.setItem('manualBienes.scores', JSON.stringify(updatedScores));
    }
  };

  // ── Generar Comprobante PDF ──
  const handleOpenCertificate = (chapterId) => {
    if (!student || !student.id || !student.name || !student.grade) {
      alert("Por favor, complete sus datos de registro primero.");
      return;
    }
    const score = scores[chapterId] || 0;
    if (score <= 80) {
      alert("No ha aprobado la evaluación de este capítulo aún.");
      return;
    }
    setCertChapter(chapterId);
    setShowCertificate(true);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // ── Renderizadores ──

  // VISTA 1: Formulario de Registro / Login
  if (!student) {
    return (
      <div className="academy-login-container">
        <div className="academy-login-card">
          <div className="login-card-header">
            <div className="brand-mark-large">
              <Icon name="cap" size={32} />
            </div>
            <h2>Plataforma de Formación Oficial</h2>
            <h3>Academia del Manual de Bienes</h3>
            <p>Manual GF-M-001 V.2 | Ministerio de Defensa Nacional</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form-body">
            <div className="form-group-row">
              <div className="form-group flex-1">
                <label>Grado del Alumno</label>
                <select 
                  value={gradeInput} 
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="login-select"
                >
                  <option value="Soldado">Soldado / Infante</option>
                  <option value="Cabo">Cabo</option>
                  <option value="Sargento">Sargento</option>
                  <option value="Suboficial">Suboficial Jefe</option>
                  <option value="Teniente">Teniente</option>
                  <option value="Capitán">Capitán</option>
                  <option value="Mayor">Mayor</option>
                  <option value="Coronel">Coronel</option>
                  <option value="General">General</option>
                  <option value="Civil">Funcionario Civil</option>
                  <option value="Contratista">Contratista</option>
                </select>
              </div>

              <div className="form-group flex-2">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  value={nameInput} 
                  onChange={(e) => setNameInput(e.target.value)} 
                  placeholder="Ej: Juan Carlos Pérez" 
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Cédula de Ciudadanía</label>
              <input 
                type="text" 
                value={idInput} 
                onChange={(e) => setIdInput(e.target.value)} 
                placeholder="Ej: 1012345678" 
                className={errors.id ? 'input-error' : ''}
              />
              {errors.id && <span className="error-text">{errors.id}</span>}
            </div>

            <div className="form-group">
              <label>Correo Electrónico Institucional</label>
              <input 
                type="email" 
                value={emailInput} 
                onChange={(e) => setEmailInput(e.target.value)} 
                placeholder="correo@defensa.gov.co" 
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Unidad Ejecutora / Fuerza</label>
              <input 
                type="text" 
                value={unitInput} 
                onChange={(e) => setUnitInput(e.target.value)} 
                placeholder="Ej: Batallón de Infantería N. 15" 
                className={errors.unit ? 'input-error' : ''}
              />
              {errors.unit && <span className="error-text">{errors.unit}</span>}
            </div>

            <button type="submit" className="login-btn">
              Iniciar Plan de Estudio Oficial
            </button>
          </form>
          
          <div className="login-footer">
            <Icon name="shield" size={14} className="text-accent" />
            <span>Sistema Protegido. Datos de evaluación de carácter oficial.</span>
          </div>
        </div>
      </div>
    );
  }

  // VISTA DE COMPROBANTE / CERTIFICADO DE APROBACIÓN
  if (showCertificate && certChapter) {
    const ch = academyData.chapters.find(c => c.id === certChapter);
    const score = scores[certChapter] || 0;
    const correctCount = Math.round((score * 15) / 100);
    const certCode = `MDN-GF-M-001-CH${certChapter}-${student.id}-${score}`;
    
    return (
      <div className="certificate-tab-container no-print">
        <div className="certificate-modal-overlay">
          <div className="certificate-modal-box">
            
            {/* Certificado para Imprimir */}
            <div id="certificateContent" className="certificate-canvas">
              <div className="certificate-frame">
                <div className="cert-logo-container">
                  <div className="cert-shield-large">
                    <Icon name="shield" size={48} className="text-gold" />
                  </div>
                </div>
                
                <h1 className="cert-institution">MINISTERIO DE DEFENSA NACIONAL</h1>
                <h2 className="cert-title-academic">CERTIFICADO DE APROBACIÓN ACADÉMICA</h2>
                
                <p className="cert-declaration">El Grupo de Contabilidad General y la Dirección de Finanzas certifican que:</p>
                
                <h3 className="cert-recipient">
                  {student.grade.toUpperCase()} {student.name.toUpperCase()}
                </h3>
                <p className="cert-recipient-id">C.C. {student.id}</p>
                
                <p className="cert-achievement-text">
                  Aprobó de manera sobresaliente el plan de estudios técnico y la evaluación del
                </p>
                
                <h4 className="cert-chapter-name">
                  CAPÍTULO {ch.num}: {ch.title.toUpperCase()}
                </h4>
                
                <p className="cert-achievement-detail">
                  Correspondiente al <strong>Manual de Procedimientos Administrativos y Financieros para el Manejo de Bienes (GF-M-001 V.2)</strong>, 
                  obteniendo una calificación aprobatoria de <strong>{correctCount} respuestas correctas de 15</strong> (equivalente al <strong>{score}%</strong> de competencias logradas).
                </p>
 
                <div className="cert-signatures-grid">
                  <div className="cert-signature-block">
                    <div className="cert-sign-line" />
                    <strong>PD. Fharit Ney Quintero Padilla</strong>
                    <p>Coordinador Grupo Contabilidad MDN</p>
                  </div>
                  <div className="cert-signature-block">
                    <div className="cert-sign-line" />
                    <strong>DD. Clara Inés Chiquillo Díaz</strong>
                    <p>Directora de Finanzas MDN</p>
                  </div>
                </div>
 
                <div className="cert-validation-block">
                  <p>Unidad: {student.unit}</p>
                  <p>Fecha de Expedición: {new Date().toLocaleDateString('es-CO')} {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="cert-code">Código de Validación: {certCode}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="certificate-modal-actions">
              <button onClick={handlePrintCertificate} className="cert-action-btn-print">
                🖨️ Imprimir / Guardar en PDF
              </button>
              <button onClick={() => setShowCertificate(false)} className="cert-action-btn-close">
                Cerrar Ventana
              </button>
            </div>
            
            <div className="cert-print-hint">
              💡 <strong>Tip para PDF:</strong> En el cuadro de diálogo de impresión, selecciona <strong>"Guardar como PDF"</strong> y en la sección de opciones adicionales, asegúrate de activar **"Gráficos de fondo"** y configurar la orientación en **"Horizontal"** (Landscape) para una presentación óptima.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VISTA 2: Dashboard General de Capítulos
  if (activeChapterId === null) {
    // Calcular progreso general
    const totalChapters = academyData.chapters.length;
    const completedChapters = Object.keys(scores).length;
    const generalProgress = Math.round((completedChapters / totalChapters) * 100);

    return (
      <div className="academy-dashboard-container">
        <header className="dashboard-topbar">
          <div className="user-profile-widget">
            <div className="avatar-capsule">
              <Icon name="user" size={18} />
            </div>
            <div>
              <strong>{student.grade} {student.name}</strong>
              <p>C.C. {student.id} | {student.unit}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-pill">
            Cerrar Sesión Academia
          </button>
        </header>

        {/* Banner de Bienvenida */}
        <section className="academy-welcome-banner">
          <div className="banner-visual-elements">
            <Icon name="cap" size={48} className="text-accent" />
          </div>
          <div className="banner-copy">
            <h2>Campus Virtual de Formación Logística</h2>
            <p>GF-M-001 V.2 - Manual de Procedimientos Administrativos y Financieros de Bienes del MDN</p>
          </div>
        </section>

        {/* Progreso del curso */}
        <section className="general-progress-card">
          <div className="progress-stat-row">
            <span>Progreso General de Formación Técnica</span>
            <strong>{generalProgress}% Completado ({completedChapters}/{totalChapters} Capítulos)</strong>
          </div>
          <div className="progress-bar-shell">
            <div className="progress-bar-fill" style={{ width: `${generalProgress}%` }} />
          </div>
        </section>

        {/* Selector de Generación de Plan */}
        <section className="study-plan-generator-shell">
          <div className="generator-title">
            <Icon name="bookOpen" size={16} className="text-accent" />
            <h3>Generador Inteligente de Planes de Estudio</h3>
          </div>
          <div className="generator-controls">
            <div className="form-group flex-1">
              <label>Seleccionar Módulo del Curso</label>
              <select 
                value={selectedModule} 
                onChange={(e) => setSelectedModule(e.target.value)}
                className="generator-select"
              >
                <option value="Curso Completo">Curso Completo (7 Capítulos)</option>
                {academyData.chapters.map(c => (
                  <option key={c.id} value={c.id}>Capítulo {c.num}: {c.title}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => {
                if (selectedModule === "Curso Completo") {
                  handleGeneratePlan(1);
                } else {
                  handleGeneratePlan(parseInt(selectedModule));
                }
              }} 
              disabled={loadingStudyPlan}
              className="generator-btn"
            >
              {loadingStudyPlan ? (
                <span>Estructurando Plan...</span>
              ) : (
                <span>Generar Plan de Estudio Oficial</span>
              )}
            </button>
          </div>
        </section>

        {/* Listado de Capítulos */}
        <section className="chapters-grid-section">
          <h3>Estructura Curricular del Curso</h3>
          <div className="chapters-grid">
            {academyData.chapters.map((ch) => {
              const score = scores[ch.id];
              const approved = score !== undefined && score > 80;

              return (
                <div key={ch.id} className={`chapter-card ${approved ? 'approved-card' : ''}`}>
                  <div className="chapter-card-header">
                    <span className={`chapter-tag ch-tag-${ch.id}`}>Capítulo {ch.num}</span>
                    {approved && <span className="approved-badge">✓ Aprobado</span>}
                  </div>
                  <h4>{ch.title}</h4>
                  <p>{ch.subtitle}</p>

                  <div className="chapter-card-metadata">
                    <div className="meta-item">
                      <Icon name="clock" size={12} />
                      <span>{ch.header.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Icon name="doc" size={12} />
                      <span>Dificultad: {ch.header.difficulty}</span>
                    </div>
                  </div>

                  <div className="chapter-card-footer">
                    {approved ? (
                      <div className="approved-actions">
                        <span className="score-pill">Nota: {score}%</span>
                        <button onClick={() => handleOpenCertificate(ch.id)} className="btn-certificate">
                          📜 Certificado
                        </button>
                        <button onClick={() => handleGeneratePlan(ch.id)} className="btn-review">
                          Repasar
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleGeneratePlan(ch.id)} className="btn-start-study">
                        Estudiar Capítulo →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // VISTA 3: Aula Virtual de un Capítulo Activo
  const activeChapter = academyData.chapters.find(c => c.id === activeChapterId);

  return (
    <div className="classroom-layout">
      {/* Aula Topbar */}
      <header className="classroom-topbar">
        <div className="classroom-title-area">
          <button onClick={() => setActiveChapterId(null)} className="btn-back-dashboard">
            <Icon name="arrowLeft" size={14} />
            <span>Dashboard</span>
          </button>
          <div className="h-6 w-px bg-slate-300 mx-2" />
          <span className="classroom-chapter-indicator">Capítulo {activeChapter.num}</span>
          <h2 className="classroom-chapter-title truncate">{activeChapter.title}</h2>
        </div>

        <div className="classroom-user-widget">
          <span className="student-badge">{student.grade} | {student.unit}</span>
          <div className="progress-ring-mini">
            <Icon name="cap" size={16} className="text-accent" />
          </div>
        </div>
      </header>

      {/* Cuerpo del Aula */}
      <div className="classroom-body">
        
        {/* Navegación del Aula (Sub-Pestañas) */}
        <aside className="classroom-nav-panel">
          <div className="nav-panel-title">Estructura de la Unidad</div>
          
          <button 
            className={`classroom-nav-item ${chapterTab === 'ruta' ? 'active' : ''}`}
            onClick={() => setChapterTab('ruta')}
          >
            <Icon name="shield" size={14} />
            <span>1. Ruta de Aprendizaje</span>
          </button>

          <button 
            className={`classroom-nav-item ${chapterTab === 'desarrollo' ? 'active' : ''}`}
            onClick={() => setChapterTab('desarrollo')}
          >
            <Icon name="bookOpen" size={14} />
            <span>2. Desarrollo del Capítulo</span>
          </button>

          <button 
            className={`classroom-nav-item ${chapterTab === 'procesos' ? 'active' : ''}`}
            onClick={() => setChapterTab('procesos')}
          >
            <Icon name="user" size={14} />
            <span>3. Procesos y Actores</span>
          </button>

          <button 
            className={`classroom-nav-item ${chapterTab === 'documentos' ? 'active' : ''}`}
            onClick={() => setChapterTab('documentos')}
          >
            <Icon name="doc" size={14} />
            <span>4. Documentos y Controles</span>
          </button>

          <button 
            className={`classroom-nav-item ${chapterTab === 'resumen' ? 'active' : ''}`}
            onClick={() => setChapterTab('resumen')}
          >
            <Icon name="clock" size={14} />
            <span>5. Resumen y Glosario</span>
          </button>

          <button 
            className={`classroom-nav-item ${chapterTab === 'practica' ? 'active' : ''}`}
            onClick={() => setChapterTab('practica')}
          >
            <Icon name="award" size={14} />
            <span>6. Actividad Práctica</span>
          </button>

          <button 
            className={`classroom-nav-item ${chapterTab === 'evaluacion' ? 'active' : ''}`}
            onClick={() => setChapterTab('evaluacion')}
          >
            <Icon name="lock" size={14} />
            <span>7. Evaluación Final</span>
          </button>

          {/* Estado de Aprobación de este Capítulo */}
          <div className="chapter-sidebar-status">
            {scores[activeChapterId] !== undefined ? (
              <div className="sidebar-status-approved">
                <strong>✓ Aprobado ({scores[activeChapterId]}%)</strong>
                <button onClick={() => handleOpenCertificate(activeChapterId)} className="btn-get-cert-mini">
                  Descargar Certificado
                </button>
              </div>
            ) : (
              <div className="sidebar-status-pending">
                <strong>⏳ Pendiente de Evaluación</strong>
                <p>Aprobación con más del 80% (mínimo 13/15 correctas)</p>
              </div>
            )}
          </div>
        </aside>

        {/* Panel de Contenido Principal del Aula */}
        <main className="classroom-main-content">
          
          {/* TAB 1: RUTA DE APRENDIZAJE */}
          {chapterTab === 'ruta' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Guía Temática del Capítulo</h3>
              </div>
              <div className="classroom-card-body">
                <div className="classroom-info-strip">
                  <div>
                    <strong>Propósito de Estudio</strong>
                    <p>{formatInlineMarkdown(activeChapter.header.purpose)}</p>
                  </div>
                </div>

                <div className="learning-meta-grid">
                  <div className="meta-card">
                    <strong>Duración Estimada</strong>
                    <p>{formatInlineMarkdown(activeChapter.header.duration)}</p>
                  </div>
                  <div className="meta-card">
                    <strong>Dificultad Académica</strong>
                    <p>{formatInlineMarkdown(activeChapter.header.difficulty)}</p>
                  </div>
                  <div className="meta-card">
                    <strong>Resultado Esperado</strong>
                    <p>{formatInlineMarkdown(activeChapter.header.expectedResult)}</p>
                  </div>
                </div>

                <div className="objectives-academic-block">
                  <h4>Objetivos Académicos de Aprendizaje</h4>
                  
                  <div className="objective-concept-row">
                    <div className="obj-type-tag obj-general">General</div>
                    <div className="obj-text">{formatInlineMarkdown(activeChapter.objectives.general)}</div>
                  </div>

                  <div className="objectives-specific-list">
                    <strong>Objetivos Específicos:</strong>
                    <ul>
                      {activeChapter.objectives.specifics.map((s, idx) => (
                        <li key={idx}>✓ {formatInlineMarkdown(s)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="objectives-competency-grid">
                    <div className="competency-box">
                      <strong>Competencias Procedimentales</strong>
                      <p>{formatInlineMarkdown(activeChapter.objectives.procedural)}</p>
                    </div>
                    <div className="competency-box">
                      <strong>Competencias Conceptuales</strong>
                      <p>{formatInlineMarkdown(activeChapter.objectives.conceptual)}</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => setChapterTab('desarrollo')} className="btn-classroom-continue">
                  Iniciar Temario →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DESARROLLO DEL CAPÍTULO */}
          {chapterTab === 'desarrollo' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Desarrollo del Temario</h3>
              </div>
              <div className="classroom-card-body">
                <p className="temario-intro-paragraph">
                  El siguiente temario contiene el desarrollo exhaustivo y detallado del capítulo conforme al Manual Oficial de Bienes. Por favor, estudie con atención cada bloque:
                </p>

                <div className="temario-blocks-list">
                  {activeChapter.temario.map((item, idx) => (
                    <div key={idx} className="temario-academic-card">
                      <div className="temario-card-header">
                        <h4>{item.title} — <span className="ref-tag">Ref: {item.reference}</span></h4>
                      </div>
                      <div className="temario-card-body">
                        {formatMarkdown(item.explanation)}

                        {item.concepts && item.concepts.length > 0 && (
                          <div className="temario-sub-concepts">
                            <h5>Conceptos Clave del Tema:</h5>
                            <div className="sub-concepts-grid">
                              {item.concepts.map((c, cIdx) => (
                                <div key={cIdx} className="sub-concept-card">
                                  <strong>{c.name}</strong>
                                  <p>{c.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setChapterTab('procesos')} className="btn-classroom-continue">
                  Ver Procesos y Actores →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PROCESOS Y ACTORES */}
          {chapterTab === 'procesos' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Mapa de Procesos y Responsables</h3>
              </div>
              <div className="classroom-card-body">
                <div className="processes-academic-block">
                  <h4>Estructura del Proceso</h4>
                  <div className="process-map-card">
                    <div className="map-detail-item">
                      <strong>Tema Principal:</strong>
                      <p>{activeChapter.map.mainTopic}</p>
                    </div>
                    <div className="map-detail-item">
                      <strong>Subtemas Críticos:</strong>
                      <p>{activeChapter.map.subtopics.join(' | ')}</p>
                    </div>
                    <div className="map-detail-item">
                      <strong>Procedimientos Asociados:</strong>
                      <p>{activeChapter.map.procedures.join(' | ')}</p>
                    </div>
                  </div>

                  <h4>Cuadro de Responsabilidades de los Actores</h4>
                  <div className="actors-table-container">
                    <table className="classroom-table">
                      <thead>
                        <tr>
                          <th>Actor / Rol del Proceso</th>
                          <th>Responsabilidad Custodial y de Trámite</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeChapter.map.actors.map((actor, idx) => (
                          <tr key={idx}>
                            <td><strong>{actor}</strong></td>
                            <td>Gestión operativa y de control contable del inventario asignado de conformidad con el manual GF-M-001.</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {activeChapter.id === 1 && (
                    <div className="custom-diagram-block">
                      <h4>Diagrama Técnico de Clasificación de Activos</h4>
                      <pre className="ascii-diagram-box">
{`┌─────────────────────────────────────────────────────────────┐
│                    CLASIFICACIÓN DE BIENES                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   TANGIBLES  │         │  INTANGIBLES │                  │
│  └──────┬───────┘         └──────┬───────┘                  │
│         │                        │                          │
│    ┌────┴────┐              ┌────┴────┐                     │
│    │         │              │         │                     │
│  INVENTARIOS  PPYE        MARCAS   SOFTWARE                 │
│    │         │              │         │                     │
│    │         │           PATENTES  LICENCIAS                │
│    │         │              │         │                     │
│    │         │          DERECHOS  OTROS                     │
│    │         │                                              │
│  CON CONTROL  HISTÓRICOS                                    │
│  ADMINISTRATIVO  Y CULTURALES                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
                      </pre>
                    </div>
                  )}

                  {activeChapter.id === 2 && (
                    <div className="custom-diagram-block">
                      <h4>Diagrama Técnico de Estructura de Relevo</h4>
                      <pre className="ascii-diagram-box">
{`┌─────────────────────────────────────────────────────────────┐
│                  RELEVO NORMAL DEL ALMACENISTA               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Paso 1: Resolución] -> Emisión de nombramiento y póliza   │
│  [Paso 2: Conteo Físico] -> Conteo del 100% en bodega       │
│  [Paso 3: Acta en Tinta] -> Liquidación y firma definitiva  │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
                      </pre>
                    </div>
                  )}
                </div>

                <button onClick={() => setChapterTab('documentos')} className="btn-classroom-continue">
                  Ver Documentos y Controles →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTOS Y CONTROLES */}
          {chapterTab === 'documentos' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Documentos Exigidos y Controles Internos</h3>
              </div>
              <div className="classroom-card-body">
                <div className="docs-controls-grid">
                  
                  {/* Bloque de Documentos */}
                  <div className="docs-control-section flex-1">
                    <div className="section-title-icon border-blue">
                      <Icon name="doc" size={16} className="text-blue" />
                      <h4>Soportes y Documentos Obligatorios</h4>
                    </div>
                    <ul className="docs-list">
                      {activeChapter.map.documents.map((doc, idx) => (
                        <li key={idx} className="doc-item-card">
                          <strong>{doc}</strong>
                          <p>Soporte legal obligatorio para la legalización formal de los movimientos transaccionales.</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bloque de Controles */}
                  <div className="docs-control-section flex-1">
                    <div className="section-title-icon border-amber">
                      <Icon name="alert" size={16} className="text-amber" />
                      <h4>Mecanismos de Control y Alertas</h4>
                    </div>
                    <ul className="controls-list">
                      {activeChapter.map.controls.map((ctrl, idx) => (
                        <li key={idx} className="control-item-card">
                          <strong>Control del Manual:</strong>
                          <p>{ctrl}</p>
                        </li>
                      ))}
                    </ul>

                    {activeChapter.map.exceptions && activeChapter.map.exceptions.length > 0 && (
                      <div className="exceptions-card-block">
                        <strong>Casos Especiales y Excepciones:</strong>
                        <p>{activeChapter.map.exceptions}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={() => setChapterTab('resumen')} className="btn-classroom-continue">
                  Ir al Resumen y Glosario →
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: RESUMEN Y GLOSARIO */}
          {chapterTab === 'resumen' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Resumen Ejecutivo y Glosario Técnico</h3>
              </div>
              <div className="classroom-card-body">
                
                {/* Resumen Ejecutivo */}
                <div className="resumen-ejecutivo-block">
                  <h4>Sintesis Ejecutiva del Capítulo</h4>
                  <div className="resumen-bullets-grid">
                    <div className="resumen-bullet-card">
                      <strong>Propósito Académico:</strong>
                      <p>{formatInlineMarkdown(activeChapter.resumen.purpose)}</p>
                    </div>
                    <div className="resumen-bullet-card">
                      <strong>Conceptos Clave:</strong>
                      <p>{formatInlineMarkdown(activeChapter.resumen.concepts)}</p>
                    </div>
                    <div className="resumen-bullet-card">
                      <strong>Procedimientos Esenciales:</strong>
                      <p>{formatInlineMarkdown(activeChapter.resumen.procedures)}</p>
                    </div>
                    <div className="resumen-bullet-card">
                      <strong>Roles Involucrados:</strong>
                      <p>{formatInlineMarkdown(activeChapter.resumen.responsibilities)}</p>
                    </div>
                    <div className="resumen-bullet-card">
                      <strong>Documentación Soporte:</strong>
                      <p>{formatInlineMarkdown(activeChapter.resumen.documents)}</p>
                    </div>
                    <div className="resumen-bullet-card">
                      <strong>Controles Establecidos:</strong>
                      <p>{formatInlineMarkdown(activeChapter.resumen.controls)}</p>
                    </div>
                  </div>

                  <div className="resumen-error-warning">
                    <strong>⚠️ Errores Críticos que se Deben Evitar:</strong>
                    <p>{formatInlineMarkdown(activeChapter.resumen.mistakes)}</p>
                  </div>
                </div>

                {/* Glosario */}
                <div className="glosario-academico-block">
                  <h4>Glosario Técnico de Términos</h4>
                  <div className="glosario-terms-list">
                    {activeChapter.glosario.map((g, idx) => (
                      <div key={idx} className="glosario-term-card">
                        <div className="term-title">
                          <strong>{formatInlineMarkdown(g.term)}</strong> — <span className="term-ref">Ref: {g.ref}</span>
                        </div>
                        <p className="term-definition">{formatInlineMarkdown(g.definition)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => setChapterTab('practica')} className="btn-classroom-continue">
                  Ir al Ejercicio Práctico →
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: ACTIVIDAD PRÁCTICA */}
          {chapterTab === 'practica' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Actividad Práctica y Caso de Estudio</h3>
              </div>
              <div className="classroom-card-body">
                <div className="practical-exercise-card">
                  <div className="exercise-header">
                    <span className="exercise-tag">Caso Académico Real</span>
                    <h4>{activeChapter.practica.context}</h4>
                  </div>
                  
                  <div className="exercise-body">
                    <div className="exercise-section">
                      <strong>Escenario del Caso:</strong>
                      <p>{formatInlineMarkdown(activeChapter.practica.scenario)}</p>
                    </div>

                    <div className="exercise-section border-slate">
                      <strong>Datos del Caso:</strong>
                      {formatMarkdown(activeChapter.practica.data)}
                    </div>

                    <div className="exercise-section-grid">
                      <div className="exercise-grid-item flex-1">
                        <strong>Preguntas Orientadoras:</strong>
                        <ul>
                          {activeChapter.practica.questions.map((q, idx) => (
                            <li key={idx}>{idx + 1}. {formatInlineMarkdown(q)}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="exercise-grid-item flex-1">
                        <strong>Pasos que debe resolver el Estudiante:</strong>
                        <ul>
                          {activeChapter.practica.steps.map((s, idx) => (
                            <li key={idx}>▪ {formatInlineMarkdown(s)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="exercise-criteria-pill">
                      <strong>Criterios de Evaluación:</strong>
                      <p>{formatInlineMarkdown(activeChapter.practica.criteria)}</p>
                    </div>

                    {/* Solución Interactiva */}
                    <div className="exercise-solution-shell">
                      <button 
                        onClick={() => setRevealSolution(!revealSolution)} 
                        className="btn-reveal-solution"
                      >
                        {revealSolution ? 'Ocultar Análisis y Solución' : '💡 Revelar Análisis y Solución de Caso'}
                      </button>

                      {revealSolution && (
                        <div className="exercise-solution-body animate-slide-down">
                          <strong>Análisis Técnico Basado en el Manual:</strong>
                          {formatMarkdown(activeChapter.practica.solution)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button onClick={() => setChapterTab('evaluacion')} className="btn-classroom-continue">
                  Ir al Examen Final →
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: EVALUACIÓN FINAL */}
          {chapterTab === 'evaluacion' && (
            <div className="classroom-card animate-fade-in">
              <div className="classroom-card-header-accent">
                <h3>Evaluación de Competencias - Capítulo {activeChapter.num}</h3>
              </div>
              <div className="classroom-card-body">
                
                {/* ── Navegador Superior de Preguntas ── */}
                {!quizSubmitted && (
                  <div className="quiz-navigator-container">
                    <div className="quiz-nav-summary">
                      <span className="quiz-nav-chapter-title">Evaluación Oficial del Capítulo {activeChapter.num}</span>
                      <div className="quiz-nav-stats">
                        <span><strong>Pregunta:</strong> {showReviewScreen ? 'Revisión' : currentQuestionIndex + 1} de {quizQuestions.length}</span>
                        <span><strong>Respondidas:</strong> {Object.keys(quizSelectedAnswers).length} de {quizQuestions.length}</span>
                        <span><strong>Pendientes:</strong> {quizQuestions.length - Object.keys(quizSelectedAnswers).length}</span>
                        <span><strong>Mínimo Aprobatorio:</strong> 13 / 15 correctas (más del 80%)</span>
                      </div>
                    </div>

                    <div className="quiz-navigator-dots">
                      {quizQuestions.map((_, idx) => {
                        const isCurrent = currentQuestionIndex === idx && !showReviewScreen;
                        const isAnswered = quizSelectedAnswers[idx] !== undefined;
                        
                        let dotClass = "nav-pending";
                        if (isCurrent) {
                          dotClass = "nav-active";
                        } else if (isAnswered) {
                          dotClass = "nav-answered";
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setShowReviewScreen(false);
                              setCurrentQuestionIndex(idx);
                            }}
                            className={`navigator-dot ${dotClass}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                      
                      <button
                        type="button"
                        onClick={() => setShowReviewScreen(true)}
                        className={`navigator-dot nav-review-btn ${showReviewScreen ? 'nav-active' : ''}`}
                        title="Revisión General"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Caso 1: Cuestionario en Curso (Pregunta por pantalla) ── */}
                {!quizSubmitted && !showReviewScreen && (
                  <div className="quiz-question-card animate-fade-in">
                    {(() => {
                      const q = quizQuestions[currentQuestionIndex];
                      if (!q) return <p>Cargando cuestionario oficial...</p>;
                      const selectedOption = quizSelectedAnswers[currentQuestionIndex];
                      
                      return (
                        <>
                          <div className="question-header">
                            <span className="question-number">Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}</span>
                            <h4>{formatInlineMarkdown(q.question)}</h4>
                          </div>
                          
                          <div className="question-options-list">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = selectedOption === optIdx;
                              const optionClass = isSelected ? 'option-selected' : 'option-neutral';

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                                  className={`quiz-option-btn ${optionClass}`}
                                >
                                  <span className="option-letter">{['A', 'B', 'C', 'D'][optIdx]}.</span>
                                  <span className="option-text">{formatInlineMarkdown(opt)}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="quiz-navigation-controls">
                            <button
                              type="button"
                              disabled={currentQuestionIndex === 0}
                              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                              className="btn-classroom-prev"
                            >
                              Anterior
                            </button>

                            {currentQuestionIndex < quizQuestions.length - 1 ? (
                              <button
                                type="button"
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                className="btn-classroom-next"
                              >
                                Siguiente
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowReviewScreen(true)}
                                className="btn-classroom-review"
                              >
                                Revisar respuestas 📋
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* ── Caso 2: Pantalla de Resumen e Instrucción de Envío ── */}
                {!quizSubmitted && showReviewScreen && (
                  <div className="quiz-review-card animate-fade-in">
                    <h4>Consolidado de Respuestas y Estado de Avance</h4>
                    <p className="review-intro">
                      Por favor, verifique el estado de su examen oficial antes de enviar la evaluación para su calificación en los libros de la Academia.
                    </p>

                    <div className="review-summary-stats">
                      <div className="review-stat-box">
                        <strong>Total Preguntas</strong>
                        <span>{quizQuestions.length}</span>
                      </div>
                      <div className="review-stat-box">
                        <strong>Respondidas</strong>
                        <span>{Object.keys(quizSelectedAnswers).length}</span>
                      </div>
                      <div className="review-stat-box">
                        <strong>Pendientes</strong>
                        <span className={quizQuestions.length - Object.keys(quizSelectedAnswers).length > 0 ? 'text-error font-bold' : ''}>
                          {quizQuestions.length - Object.keys(quizSelectedAnswers).length}
                        </span>
                      </div>
                    </div>

                    {quizQuestions.length - Object.keys(quizSelectedAnswers).length > 0 ? (
                      <div className="review-warning-alert">
                        <strong>⚠️ Evaluación Pendiente</strong>
                        <p>No ha respondido la totalidad del cuestionario. Debe contestar las 15 preguntas obligatoriamente antes de enviar.</p>
                      </div>
                    ) : (
                      <div className="review-success-alert">
                        <strong>✓ Evaluación Completa</strong>
                        <p>Todas las preguntas han sido respondidas. Puede proceder a calificar su evaluación para registrar su nota.</p>
                      </div>
                    )}

                    <div className="review-actions">
                      <button
                        type="button"
                        onClick={() => {
                          setShowReviewScreen(false);
                          const firstUnanswered = quizQuestions.findIndex((_, idx) => quizSelectedAnswers[idx] === undefined);
                          setCurrentQuestionIndex(firstUnanswered !== -1 ? firstUnanswered : 0);
                        }}
                        className="btn-classroom-back-quiz"
                      >
                        Volver a las Preguntas
                      </button>

                      <button
                        type="button"
                        disabled={Object.keys(quizSelectedAnswers).length < quizQuestions.length}
                        onClick={handleSubmitQuiz}
                        className="btn-submit-evaluation"
                      >
                        Enviar Evaluación Oficial
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Caso 3: Evaluación Enviada y Calificada (Resultados) ── */}
                {quizSubmitted && (
                  <div className="quiz-results-container">
                    <div className="quiz-results-card animate-fade-in">
                      <div className="score-circle-shell">
                        <div className={`score-ring ${quizApproved ? 'ring-success' : 'ring-error'}`}>
                          {quizScore}%
                        </div>
                        <div>
                          <h4>Calificación Final: {quizScore}% ({Math.round((quizScore * 15) / 100)} / 15 correctas)</h4>
                          {quizApproved ? (
                            <p className="text-success font-bold">¡APROBADO! Ha superado de forma satisfactoria la evaluación de este capítulo.</p>
                          ) : (
                            <p className="text-error font-bold">NO APROBADO. Se requiere más del 80% (mínimo 13 respuestas correctas de 15).</p>
                          )}
                        </div>
                      </div>

                      <div className="results-actions-row">
                        {quizApproved ? (
                          <>
                            <button 
                              onClick={() => handleOpenCertificate(activeChapterId)} 
                              className="btn-download-cert"
                            >
                              📜 Generar Comprobante Oficial
                            </button>
                            <button 
                              onClick={() => {
                                if (activeChapterId < 7) {
                                  handleGeneratePlan(activeChapterId + 1);
                                } else {
                                  setActiveChapterId(null);
                                }
                              }} 
                              className="btn-next-chapter"
                            >
                              Continuar al Siguiente Capítulo →
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleGeneratePlan(activeChapterId)} 
                            className="btn-retry-quiz"
                          >
                            Repetir Evaluación (Nuevo Intento)
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="quiz-questions-stream mt-6">
                      <h4 className="results-review-title">Revisión de Respuestas y Fundamentos del Manual</h4>
                      {quizQuestions.map((q, idx) => {
                        const selectedOption = quizSelectedAnswers[idx];
                        const isCorrect = q.correct === selectedOption;
                        
                        return (
                          <div key={idx} className="quiz-question-card">
                            <div className="question-header">
                              <span className="question-number">Pregunta {idx + 1} de 15</span>
                              <h4>{formatInlineMarkdown(q.question)}</h4>
                            </div>
                            
                            <div className="question-options-list">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = selectedOption === optIdx;
                                const isOptionCorrect = q.correct === optIdx;
                                
                                let optionClass = 'option-neutral';
                                if (isSelected) {
                                  optionClass = 'option-selected';
                                }
                                if (isOptionCorrect) {
                                  optionClass = 'option-correct';
                                } else if (isSelected) {
                                  optionClass = 'option-incorrect';
                                } else {
                                  optionClass = 'option-disabled';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    disabled
                                    className={`quiz-option-btn ${optionClass}`}
                                  >
                                    <span className="option-letter">{['A', 'B', 'C', 'D'][optIdx]}.</span>
                                    <span className="option-text">{formatInlineMarkdown(opt)}</span>
                                    {isOptionCorrect && <span className="mark-icon">✓</span>}
                                    {isSelected && !isOptionCorrect && <span className="mark-icon">✗</span>}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Retroalimentación en caso de fallo */}
                            {!isCorrect && (
                              <div className="quiz-feedback-box">
                                <strong>Fundamento Contable/Logístico del Manual:</strong>
                                <p>{formatInlineMarkdown(q.feedback)}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
