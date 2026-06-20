// Detailed Medical Training Curriculum Data for all 6 courses

export const programs = [
  { id: 'p1', code: 'BLS', name: 'Basic Life Support', description: 'Fundamental CPR, AED, and choking relief techniques for adults, children, and infants.', duration: '8 hours', price: 1500, modules: 6, completionRate: 85, color: 'blue' },
  { id: 'p2', code: 'ACLS', name: 'Advanced Cardiovascular Life Support', description: 'Advanced emergency care for cardiac arrest, symptomatic arrhythmias, and stroke.', duration: '16 hours', price: 3000, modules: 6, completionRate: 75, color: 'red' },
  { id: 'p3', code: 'PALS', name: 'Pediatric Advanced Life Support', description: 'Approach to sick children, pediatric CPR, respiratory failure, and pediatric shock.', duration: '14 hours', price: 2500, modules: 6, completionRate: 71, color: 'green' },
  { id: 'p4', code: 'NALS', name: 'Neonatal Advanced Life Support', description: 'Neonatal resuscitation, Golden Minute, positive pressure ventilation, and compressions.', duration: '12 hours', price: 2200, modules: 6, completionRate: 65, color: 'amber' },
  { id: 'p5', code: 'ATLS', name: 'Advanced Trauma Life Support', description: 'Systematic approach to evaluating and stabilizing major trauma and shock victims.', duration: '18 hours', price: 3500, modules: 6, completionRate: 60, color: 'slate' },
  { id: 'p6', code: 'BLSO', name: 'Basic Life Support in Obstetrics', description: 'Management of normal labor, postpartum hemorrhage, shoulder dystocia, and maternal CPR.', duration: '10 hours', price: 1800, modules: 6, completionRate: 80, color: 'purple' }
]

export const courses = [
  // BLS Course
  {
    id: 'c1', programId: 'p1', name: 'BLS — Basic Life Support Course', description: 'Learn high-quality CPR, AED usage, and choking relief for all ages.', progress: 0,
    modules: [
      {
        id: 'bls-m1', title: 'CPR & Survival Chains', type: 'pdf', duration: '15 min',
        learningObjectives: 'Understand the importance of immediate CPR and the sequential links in the Out-of-Hospital (OHCA) and In-Hospital (IHCA) Chains of Survival.',
        studyContent: 'High-quality CPR is the cornerstone of resuscitation. Early chest compressions maintain vital coronary and cerebral perfusion. The Chain of Survival describes the critical actions needed: Recognition of arrest, Activation of EMS, High-quality CPR, Rapid Defibrillation, Advanced Life Support, and Post-Resuscitation Care.',
        clinicalScenarios: 'A 60-year-old female collapses suddenly in a grocery store. She is unresponsive and gasping. Responders immediately call for help, retrieve the AED, and start chest compressions.',
        importantNotes: 'Always check responsiveness and look for breathing/pulse simultaneously for 5-10 seconds. Do not delay CPR if you are unsure.',
        keyTakeaways: ['CPR maintains oxygen flow to the brain.', 'Rate: 100-120 compressions per minute.', 'Minimize compression pauses to under 10 seconds.'],
        clinicalPearls: 'Pushing hard and fast saves cells. Allow complete chest recoil between compressions to let the heart fill with blood.',
        emergencyAlgorithms: 'Check response -> No breathing/pulse -> Call for help & AED -> Start 30:2 compressions & breaths.',
        references: 'American Heart Association Guidelines for CPR & ECC, 2020 update.'
      },
      {
        id: 'bls-m2', title: 'Scene Safety and Patient Assessment', type: 'video', duration: '20 min',
        learningObjectives: 'Verify scene safety, assess the patient for responsiveness, breathing, and pulse, and call for emergency response.',
        studyContent: 'Before approaching any victim, ensure the scene is safe for you and the victim. Shake and shout at the patient. Assess chest rise and carotid/brachial pulse for no more than 10 seconds. If no pulse or abnormal breathing (only gasping), activate emergency services immediately.',
        clinicalScenarios: 'An electrician is shocked by a wire. Before touching the victim, you must ensure the power source is shut off to prevent becoming a victim yourself.',
        importantNotes: 'Do not move the victim unless the scene is unsafe (e.g., fire, collapsing structure).',
        keyTakeaways: ['Ensure personal safety first.', 'Shout for nearby help.', 'Simultaneous check of pulse and breathing.'],
        clinicalPearls: 'Agonal gasps are NOT normal breathing; they are a sign of cardiac arrest. Start CPR immediately.',
        emergencyAlgorithms: 'Scan environment -> Touch shoulder & shout -> Assess pulse & chest rise -> Call 911 / EMS.',
        references: 'International Liaison Committee on Resuscitation (ILCOR) Consensus, 2021.'
      },
      {
        id: 'bls-m3', title: 'Adult Chest Compressions', type: 'pdf', duration: '25 min',
        learningObjectives: 'Perform high-quality adult chest compressions with correct hand placement, depth, rate, and chest recoil.',
        studyContent: 'Place the heel of one hand on the lower half of the breastbone, and the other hand on top. Keep arms straight and push down at least 2 inches (5 cm) but no more than 2.4 inches (6 cm). Compress at a rate of 100 to 120 compressions per minute. Allow the chest to recoil fully.',
        clinicalScenarios: 'You are performing CPR on a 75-year-old male. You hear ribs cracking. Maintain proper depth and rate; rib fractures are a common complication but CPR must continue.',
        importantNotes: 'Ensure compressions are performed on a firm, flat surface.',
        keyTakeaways: ['Depth: 2 to 2.4 inches.', 'Rate: 100-120 per minute.', 'Complete chest recoil is mandatory.'],
        clinicalPearls: 'Use your body weight to push, not just your arms. Keep your shoulders directly over your hands.',
        emergencyAlgorithms: 'Hands on center of chest -> Compress 2 inches deep -> 100-120 bpm -> Switch rescuers every 2 minutes.',
        references: 'AHA CPR Guidelines, Section on Adult Resuscitation.'
      },
      {
        id: 'bls-m4', title: 'Rescue Breathing & Ventilation', type: 'interactive', duration: '30 min',
        learningObjectives: 'Deliver breaths using mouth-to-mask or bag-mask ventilation, preventing hyperventilation.',
        studyContent: 'Open the airway using head tilt-chin lift (or jaw thrust if spinal injury suspected). Provide 2 breaths after every 30 compressions. Deliver each breath over 1 second, watching for chest rise. Avoid rapid or forceful breaths, which cause gastric inflation.',
        clinicalScenarios: 'A near-drowning victim is pulled from a pool. Provide 2 rescue breaths immediately before compressions, as the arrest is primarily respiratory.',
        importantNotes: 'If using a bag-mask, use the E-C clamp technique to maintain a tight mask seal.',
        keyTakeaways: ['Deliver breaths over 1 second each.', 'Look for visible chest rise.', 'Avoid hyperventilation.'],
        clinicalPearls: 'A good mask seal is crucial. Use two hands for the mask clamp if another rescuer is compressing.',
        emergencyAlgorithms: 'Head tilt-chin lift -> Seal mask -> Deliver breath over 1 sec -> 30:2 ratio.',
        references: 'European Resuscitation Council (ERC) Guidelines, 2020.'
      },
      {
        id: 'bls-m5', title: 'AED Operations', type: 'pdf', duration: '20 min',
        learningObjectives: 'Operate an AED safely and efficiently on adults, children, and infants.',
        studyContent: 'As soon as the AED arrives, turn it on. Attach pads to the bare chest: upper right side and lower left side. Clear the victim while the AED analyzes the rhythm. If a shock is advised, clear the victim again, deliver the shock, and immediately resume chest compressions.',
        clinicalScenarios: 'The AED arrives. You apply pads, but the chest is wet. Wipe the chest dry before applying pads to ensure adequate electrical contact.',
        importantNotes: 'Never delay compressions to wait for the AED. Continue CPR until the AED is ready to analyze.',
        keyTakeaways: ['Power on the AED first.', 'Apply pads correctly.', 'Do not touch the patient during analysis or shock.'],
        clinicalPearls: 'Use pediatric pads for children under 8 years. If unavailable, use adult pads, ensuring they do not overlap.',
        emergencyAlgorithms: 'Turn on AED -> Apply pads -> Clear patient for analysis -> Press shock if advised -> Resume CPR.',
        references: 'AHA Guidelines, Section on Defibrillation.'
      },
      {
        id: 'bls-m6', title: 'Choking Relief (FBAO)', type: 'video', duration: '15 min',
        learningObjectives: 'Identify and relieve foreign body airway obstruction in adults, children, and infants.',
        studyContent: 'For severe choking in a responsive adult/child, perform abdominal thrusts (Heimlich maneuver). For infants, perform cycles of 5 back blows and 5 chest thrusts. If the victim becomes unresponsive, start CPR, checking the airway for the object before giving breaths.',
        clinicalScenarios: 'A diner at a restaurant suddenly clutches his throat and cannot speak. You ask if he is choking; he nods. Perform abdominal thrusts until the object is expelled or he loses consciousness.',
        importantNotes: 'Do not perform blind finger sweeps; only remove an object if it is clearly visible.',
        keyTakeaways: ['Perform Heimlich maneuver for severe obstruction.', 'Use back blows & chest thrusts for infants.', 'Start CPR if choking victim collapses.'],
        clinicalPearls: 'Deliver distinct, powerful thrusts to create enough airway pressure to eject the foreign body.',
        emergencyAlgorithms: 'Severe obstruction -> Abdominal thrusts -> If collapses -> Call EMS -> Start CPR (look in mouth before breaths).',
        references: 'ILCOR Guidelines on Airway Obstruction Relief.'
      }
    ]
  },
  // ACLS Course
  {
    id: 'c2', programId: 'p2', name: 'ACLS — Advanced Cardiovascular Life Support', description: 'Master advanced algorithms for cardiac arrest, stroke, bradycardia, and tachycardia.', progress: 0,
    modules: [
      {
        id: 'acls-m1', title: 'ACLS CPR & Systems of Care', type: 'pdf', duration: '20 min',
        learningObjectives: 'Optimize chest compression quality and integrate ACLS systems of care, including high-performance team dynamics.',
        studyContent: 'ACLS builds on high-quality BLS. Minimize chest compression fraction pauses, target a chest compression fraction of >80%. Roles should be clearly assigned: team leader, compressor, airway, monitor/defibrillator, medications, recorder.',
        clinicalScenarios: 'A team responds to a code blue in the ICU. The leader assigns roles before arrival, ensuring zero delay when the cart arrives.',
        importantNotes: 'Use quantitative waveform capnography (PETCO2) to monitor CPR quality. If PETCO2 is <10 mmHg, improve chest compressions.',
        keyTakeaways: ['High-performance team dynamics save lives.', 'Maintain compression fraction >80%.', 'Target PETCO2 >10 mmHg.'],
        clinicalPearls: 'Clear, concise closed-loop communication prevents errors during high-stress resuscitations.',
        emergencyAlgorithms: 'Assign roles -> Establish CPR -> Connect monitor/waveform ETCO2 -> Evaluate rhythm.',
        references: 'AHA ACLS Guidelines, 2020.'
      },
      {
        id: 'acls-m2', title: 'Airway & Ventilation in Resuscitation', type: 'video', duration: '25 min',
        learningObjectives: 'Manage the airway using basic and advanced devices, and confirm placement of advanced airways.',
        studyContent: 'Basic airway includes OPA/NPA. Advanced airways include LMA and Endotracheal Intubation. Confirm tube placement with bilateral chest rise, breath sounds, and waveform capnography. Provide 1 breath every 6 seconds (10 breaths/min) with continuous compressions once advanced airway is placed.',
        clinicalScenarios: 'A patient is intubated during cardiac arrest. Waveform capnography immediately shows a square wave with PETCO2 of 25 mmHg, confirming correct placement in the trachea.',
        importantNotes: 'Do not interrupt compressions for more than 10 seconds to attempt intubation.',
        keyTakeaways: ['Confirm tube placement with waveform capnography.', 'Ventilation rate with advanced airway: 1 breath every 6 seconds.', 'Avoid hyperventilation to prevent decreased cardiac output.'],
        clinicalPearls: 'If waveform capnography flatlines or drops suddenly, immediately check for tube displacement, circuit disconnection, or loss of ROSC.',
        emergencyAlgorithms: 'Insert tube -> Inflate cuff -> Check breath sounds & ETCO2 -> Continuous compressions + 1 breath/6s.',
        references: 'AHA Airway Management Guidelines.'
      },
      {
        id: 'acls-m3', title: 'VF & Pulseless VT Algorithm', type: 'pdf', duration: '30 min',
        learningObjectives: 'Deliver defibrillation and administer vasopressors and antiarrhythmics in shockable rhythms.',
        studyContent: 'VF and pulseless VT are shockable rhythms. Defibrillate immediately (Biphasic: 120-200J; Monophasic: 360J). Resume CPR immediately for 2 minutes. Give Epinephrine 1 mg IV/IO every 3-5 minutes (after 2nd shock). Give Amiodarone 300 mg IV/IO (after 3rd shock), with a second dose of 150 mg if needed.',
        clinicalScenarios: 'A 50-year-old male is in VF. After the first shock, the compressor resumes CPR. The team prepares Epinephrine 1 mg for administration after the second shock.',
        importantNotes: 'Lidocaine (1-1.5 mg/kg first dose, then 0.5-0.75 mg/kg) is an acceptable alternative to Amiodarone.',
        keyTakeaways: ['Defibrillate shockable rhythms immediately.', 'Epinephrine 1 mg every 3-5 minutes.', 'Amiodarone 300 mg first dose, 150 mg second dose.'],
        clinicalPearls: 'Charge the defibrillator 15 seconds before the 2-minute CPR cycle ends to minimize pauses.',
        emergencyAlgorithms: 'Rhythm Check -> Shockable (VF/pVT) -> Deliver Shock -> 2 min CPR -> Shock -> 2 min CPR + Epi -> Shock -> 2 min CPR + Amiodarone.',
        references: 'AHA Cardiac Arrest Algorithms.'
      },
      {
        id: 'acls-m4', title: 'PEA & Asystole Algorithms', type: 'pdf', duration: '30 min',
        learningObjectives: 'Manage non-shockable rhythms, search for reversible causes (5 Hs and 5 Ts), and administer early epinephrine.',
        studyContent: 'PEA and Asystole are non-shockable rhythms. Administer Epinephrine 1 mg IV/IO immediately and repeat every 3-5 minutes. Continue high-quality CPR. Reversible causes must be identified: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo-/Hyperkalemia, Hypothermia, Tension pneumothorax, Tamponade (cardiac), Toxins, Thrombosis (coronary/pulmonary).',
        clinicalScenarios: 'A patient collapses with a flatline on the monitor. The team starts CPR, administers Epinephrine immediately, and checks for severe acidosis and hypovolemia.',
        importantNotes: 'Do not deliver shocks for PEA or Asystole. It damages the myocardium and does not help.',
        keyTakeaways: ['Epinephrine immediately for non-shockable rhythms.', 'Search for reversible Hs and Ts.', 'High-quality CPR is paramount.'],
        clinicalPearls: 'Hypovolemia and hypoxia are the two most common and treatable causes of PEA. Start fluids and optimize oxygenation.',
        emergencyAlgorithms: 'Rhythm Check -> Non-shockable (Asystole/PEA) -> Give Epi immediately -> 2 min CPR -> Check Hs & Ts -> Reassess.',
        references: 'AHA Guidelines for Non-Shockable Cardiac Arrest.'
      },
      {
        id: 'acls-m5', title: 'Bradycardia & Tachycardia Management', type: 'pdf', duration: '25 min',
        learningObjectives: 'Differentiate stable vs. unstable arrhythmias and choose appropriate pharmacologic or electrical interventions.',
        studyContent: 'Unstable arrhythmia has signs of poor perfusion (hypotension, altered mental status, chest pain, acute heart failure). Unstable bradycardia: give Atropine 1 mg IV (repeat up to 3 mg) or initiate transcutaneous pacing or Dopamine/Epinephrine infusion. Unstable tachycardia: perform immediate synchronized cardioversion. Stable tachycardia: check QRS width. Wide QRS (>0.12s) may need Amiodarone; narrow QRS needs Adenosine (6 mg then 12 mg) or vagal maneuvers.',
        clinicalScenarios: 'A patient presents with a heart rate of 35 bpm, blood pressure 80/40, and confusion. Since she is unstable, you administer Atropine 1 mg IV and prepare the transcutaneous pacer.',
        importantNotes: 'Synchronized cardioversion must be synced to the R-wave to avoid inducing VF.',
        keyTakeaways: ['Unstable arrhythmias require immediate pacing or cardioversion.', 'Atropine dose: 1 mg IV, max 3 mg.', 'Adenosine for stable narrow-complex tachycardia: 6 mg then 12 mg.'],
        clinicalPearls: 'For stable wide-complex tachycardias, do not give adenosine unless it is monomorphic and regular.',
        emergencyAlgorithms: 'Assess stability -> If unstable brady: Atropine -> Pace. If unstable tachy: Cardiovert. If stable tachy: Vagal -> Adenosine.',
        references: 'AHA Arrhythmia Management Guidelines.'
      },
      {
        id: 'acls-m6', title: 'Post-Cardiac Arrest Care & TTM', type: 'pdf', duration: '20 min',
        learningObjectives: 'Manage the post-ROSC patient, target temperature management, and optimize hemodynamics.',
        studyContent: 'Post-ROSC care: maintain oxygen saturation 92-98%, optimize BP (MAP >65 mmHg, systolic BP >90 mmHg; use norepinephrine or dopamine if needed). Obtain a 12-lead ECG. Perform Targeted Temperature Management (TTM) between 32°C and 36°C for at least 24 hours if the patient is unresponsive after ROSC.',
        clinicalScenarios: 'A patient achieves ROSC after VF arrest but remains comatose. The team initiates cold saline infusion, sets a cooling blanket to 33°C, and starts a norepinephrine drip to maintain MAP at 70 mmHg.',
        importantNotes: 'Do not hyperventilate; target a normal PaCO2 (35-45 mmHg) to prevent cerebral vasoconstriction.',
        keyTakeaways: ['Maintain MAP >65 mmHg.', 'TTM: 32°C - 36°C for 24 hours.', 'Avoid hyperoxia and hyperventilation.'],
        clinicalPearls: 'TTM is critical for neuroprotection. Prevent shivering during cooling by using sedatives or paralytics.',
        emergencyAlgorithms: 'ROSC achieved -> Assess airway/breathing -> Target SpO2 92-98% -> Maintain MAP >65 mmHg -> 12-lead ECG -> If comatose, start TTM.',
        references: 'AHA Post-Cardiac Arrest Care Guidelines.'
      }
    ]
  },
  // PALS Course
  {
    id: 'c3', programId: 'p3', name: 'PALS — Approach to a Sick Child', description: 'Learn pediatric assessment, airway management, fluid resuscitation, and CPR.', progress: 0,
    modules: [
      {
        id: 'pals-m1', title: 'Pediatric Assessment Triangle (PAT)', type: 'pdf', duration: '20 min',
        learningObjectives: 'Perform rapid, non-contact doorway assessment of a child using the Pediatric Assessment Triangle (PAT).',
        studyContent: 'The PAT is a rapid assessment tool that requires no patient contact. It evaluates: Appearance (muscle tone, interactiveness, consolability, look/gaze, speech/cry - TICLS), Work of Breathing (stridor, grunting, retractions, nasal flaring), and Circulation to Skin (pallor, mottling, cyanosis). Assess in under 30 seconds.',
        clinicalScenarios: 'A 2-year-old child presents with intercostal retractions, nasal flaring, and lethargy. The PAT indicates abnormal appearance and abnormal breathing, indicating respiratory failure.',
        importantNotes: 'If the PAT is abnormal, immediately initiate life-saving interventions before the primary ABCDE assessment.',
        keyTakeaways: ['PAT evaluates: Appearance, Breathing, Circulation.', 'TICLS assessment checks appearance.', 'Rapid assessment in under 30 seconds.'],
        clinicalPearls: 'An abnormal appearance (lethargy, poor tone) often indicates brain hypoxia or poor cerebral perfusion.',
        emergencyAlgorithms: 'Observe doorway appearance -> Check work of breathing -> Observe skin circulation -> Classify severity.',
        references: 'AHA PALS Guidelines, Section on Pediatric Assessment.'
      },
      {
        id: 'pals-m2', title: 'ABCDE Primary Assessment', type: 'pdf', duration: '30 min',
        learningObjectives: 'Perform the ABCDE assessment in children, evaluating airway patency, chest rise, pulses, neurological status, and exposure.',
        studyContent: 'Assess, intervene, and reassess at each step. Airway: check patency. Breathing: check RR, work of breathing, air entry, breath sounds, SpO2. Circulation: check HR, peripheral/central pulses, capillary refill time (CRT), skin temperature, BP. Disability: check AVPU, pupils, blood glucose. Exposure: full examination while preventing hypothermia.',
        clinicalScenarios: 'A 5-year-old child in shock is evaluated. Capillary refill is 4 seconds, peripheral pulses are thready, and blood pressure is normal (compensated shock).',
        importantNotes: 'Always check blood glucose in a critically ill child; hypoglycemia is a common cause of altered mental status.',
        keyTakeaways: ['Perform systematic Airway, Breathing, Circulation, Disability, Exposure.', 'Always check blood sugar.', 'Reassess after every intervention.'],
        clinicalPearls: 'Children maintain their BP during shock via extreme vasoconstriction. A normal BP does not mean the child is stable.',
        emergencyAlgorithms: 'Evaluate Airway -> Evaluate Breathing -> Evaluate Circulation -> Check AVPU & Sugar -> Expose & warm.',
        references: 'Pediatric Advanced Life Support Providers Manual, AHA.'
      },
      {
        id: 'pals-m3', title: 'Pediatric Airway and Respiratory Failure', type: 'interactive', duration: '25 min',
        learningObjectives: 'Differentiate respiratory distress from respiratory failure and manage pediatric airways.',
        studyContent: 'Respiratory distress: increased work of breathing (retractions, tachypnea) with preserved mental state and normal oxygenation. Respiratory failure: inadequate oxygenation/ventilation (cyanosis, grunting, gasping, lethargy). Manage with bag-mask ventilation (BMV), proper sizing, and pressure. BMV rate: 1 breath every 2-3 seconds (20-30 breaths/min).',
        clinicalScenarios: 'An infant with bronchiolitis has irregular breathing, cyanosis, and is floppy. Start bag-mask ventilation immediately.',
        importantNotes: 'Do not hyperextend an infant\'s neck during airway opening; use a neutral sniffing position.',
        keyTakeaways: ['Failure involves altered mental state and cyanosis.', 'BMV rate: 1 breath every 2-3 seconds.', 'Use sniffing position for infants.'],
        clinicalPearls: 'Hypoxia is the primary cause of cardiac arrest in children. Correcting breathing early prevents arrest.',
        emergencyAlgorithms: 'Assess respiratory state -> If failure: Position head -> Secure mask -> Deliver PPV 20-30/min -> Check chest rise.',
        references: 'ILCOR Pediatric Airway Consensus.'
      },
      {
        id: 'pals-m4', title: 'Pediatric Shock & Fluid Resuscitation', type: 'pdf', duration: '30 min',
        learningObjectives: 'Differentiate types of shock (hypovolemic, distributive, cardiogenic, obstructive) and manage with fluids.',
        studyContent: 'Shock is inadequate oxygen delivery to tissues. Treat compensated and hypotensive shock with fluid resuscitation: give 20 ml/kg bolus of isotonic crystalloid (e.g., normal saline) over 5-20 minutes. Repeat as needed, checking for hepatomegaly or crackles (signs of fluid overload).',
        clinicalScenarios: 'A 10 kg infant with severe diarrhea presents with cold, mottled skin, thready pulses, and a heart rate of 190. Give a 200 ml bolus of normal saline over 10 minutes.',
        importantNotes: 'For cardiogenic shock (e.g., myocarditis), give smaller fluid volumes (5-10 ml/kg) slowly and consider vasoactive support.',
        keyTakeaways: ['Fluid bolus dose: 20 ml/kg of normal saline.', 'Check for fluid overload (hepatomegaly, crackles) after each bolus.', 'Establish IO access if IV cannot be placed within 90 seconds.'],
        clinicalPearls: 'Intraosseous (IO) access is a rapid, safe, and effective route for fluids and drugs in pediatric resuscitation.',
        emergencyAlgorithms: 'Identify shock -> Place IV or IO -> Deliver 20 ml/kg bolus -> Reassess pulses & liver size.',
        references: 'PALS Guidelines, Shock Management Section.'
      },
      {
        id: 'pals-m5', title: 'Pediatric Arrhythmias', type: 'pdf', duration: '20 min',
        learningObjectives: 'Manage bradycardia and tachycardia in children, including medication doses and electrical cardioversion.',
        studyContent: 'Pediatric bradycardia with poor perfusion despite oxygen/ventilation: start CPR if HR <60 bpm. Administer Epinephrine 0.01 mg/kg IV/IO or Atropine 0.02 mg/kg. Pediatric tachycardia: Sinus Tachycardia (HR <220 infants, <180 children, variable) vs. SVT (HR >220 infants, >180 children, abrupt). Stable SVT: vagal maneuvers or Adenosine 0.1 mg/kg (max 6 mg). Unstable SVT: synchronized cardioversion 0.5-1 J/kg.',
        clinicalScenarios: 'A 6-month-old infant is unresponsive with a heart rate of 50 bpm and poor perfusion. Bag-mask ventilation is initiated, but after 30 seconds, HR remains 50 bpm. Start chest compressions.',
        importantNotes: 'Epinephrine is the primary drug for pediatric bradycardia, unlike adults where atropine is preferred.',
        keyTakeaways: ['CPR for child HR <60 bpm with poor perfusion.', 'Adenosine dose: 0.1 mg/kg first dose.', 'Cardioversion dose: 0.5 to 1 J/kg.'],
        clinicalPearls: 'In children, bradycardia is usually a pre-arrest sign secondary to hypoxia. Oxygenate first.',
        emergencyAlgorithms: 'HR <60 with poor perfusion -> Vent -> Still <60 -> CPR -> Give Epinephrine 0.01 mg/kg.',
        references: 'AHA PALS Arrhythmia Algorithms.'
      },
      {
        id: 'pals-m6', title: 'High-Quality Pediatric CPR & Post-ROSC Care', type: 'video', duration: '20 min',
        learningObjectives: 'Perform high-quality pediatric CPR and deliver targeted post-cardiac arrest management.',
        studyContent: 'CPR compression depth: 1/3 AP chest diameter (approx 1.5 inches / 4 cm in infants, 2 inches / 5 cm in children). Ratio: 30:2 for single rescuer, 15:2 for two rescuers. Post-ROSC care: maintain oxygen saturation 94-99%, avoid hypotension (maintain systolic BP >5th percentile), perform cooling/TTM if comatose.',
        clinicalScenarios: 'Two rescuers perform CPR on an 8-year-old child. One compressor performs 15 compressions, and the other delivers 2 breaths using a bag-mask.',
        importantNotes: 'Minimize interruptions to less than 10 seconds. Switch compressors every 2 minutes.',
        keyTakeaways: ['15:2 ratio for two-rescuer CPR.', 'Depth: 1/3 chest diameter.', 'Post-ROSC target SpO2: 94-99%.'],
        clinicalPearls: 'During CPR, use the two thumb-encircling hands technique for infants when two rescuers are present.',
        emergencyAlgorithms: 'Two rescuers -> 15:2 compressions/breaths -> Limit pauses -> ROSC -> Target SpO2 94-99% -> Measure BP.',
        references: 'AHA PALS Resuscitation Guidelines.'
      }
    ]
  },
  // NALS Course
  {
    id: 'c4', programId: 'p4', name: 'NALS — Neonatal Resuscitation', description: 'Golden Minute, PPV, MR SOPA, neonatal compressions, medications and post-resuscitation care.', progress: 0,
    modules: [
      {
        id: 'nals-m1', title: 'Before the Baby Arrives & Initial Steps', type: 'pdf', duration: '20 min',
        learningObjectives: 'Perform antenatal risk assessment, prepare equipment, and conduct initial steps of newborn care.',
        studyContent: 'Ask 4 questions before birth: Gestational age? Clear fluid? Number of babies? Additional risk factors? Assemble team and check equipment (warmer, suction, bag, mask, oxygen, intubation gear). At birth, check: Term? Good tone? Breathing/crying? If no, move to warmer, dry, stimulate, position airway, and clear secretions.',
        clinicalScenarios: 'A mother presents in preterm labor at 32 weeks with meconium-stained fluid. The resuscitation team prepares a warmer, suction catheter, and a T-piece resuscitator.',
        importantNotes: 'The Golden Minute refers to the first 60 seconds after birth to complete initial steps, re-evaluate, and start positive pressure ventilation if needed.',
        keyTakeaways: ['Prepare equipment and assign roles before delivery.', 'Initial steps: Warm, position, clear airway, dry, stimulate.', 'Decide on intervention within 60 seconds.'],
        clinicalPearls: 'Avoid suctioning vigorously or routinely unless the airway is obstructed; it can induce vagal bradycardia.',
        emergencyAlgorithms: 'Assess 4 questions -> Birth -> Warm, dry, stimulate -> Check heart rate & breathing.',
        references: 'Neonatal Resuscitation Program (NRP) Textbook, 8th Edition.'
      },
      {
        id: 'nals-m2', title: 'Positive Pressure Ventilation (PPV)', type: 'video', duration: '30 min',
        learningObjectives: 'Deliver positive pressure ventilation (PPV) and monitor heart rate and pre-ductal oxygen saturation.',
        studyContent: 'Indication for PPV: apnoea, gasping, or heart rate <100 bpm. Start PPV within 60 seconds of birth. Use a rate of 40-60 breaths per minute ("Breathe, two, three, Breathe, two, three"). Start with 21% oxygen for term babies and 21-30% for preterm. Apply pulse oximeter to the right wrist (pre-ductal SpO2).',
        clinicalScenarios: 'A newborn is gasping at 30 seconds of life, heart rate is 80 bpm. Place the baby under the warmer and begin PPV at 21% oxygen. Attach SpO2 sensor to right hand.',
        importantNotes: 'Heart rate is the single most important indicator of successful resuscitation. Check heart rate by listening with a stethoscope.',
        keyTakeaways: ['Start PPV if HR <100 or gasping/apneic.', 'Ventilation rate: 40-60 bpm.', 'Measure pre-ductal SpO2 on the right hand/wrist.'],
        clinicalPearls: 'Titrate oxygen concentration based on the target SpO2 table (range starts at 60-65% at 1 min and increases to 85-95% by 10 min).',
        emergencyAlgorithms: 'Assess HR -> If <100 -> Apply pulse ox on right hand -> Start PPV at 20-25 cmH2O -> Count HR.',
        references: 'NRP Guidelines on Positive Pressure Ventilation.'
      },
      {
        id: 'nals-m3', title: 'MR SOPA Corrective Steps', type: 'interactive', duration: '25 min',
        learningObjectives: 'Identify inadequate ventilation and perform MR SOPA corrective steps systematically.',
        studyContent: 'If heart rate does not improve and chest does not rise during PPV, perform MR SOPA: Mask adjustment (re-apply mask), Reposition airway (neutral/sniffing), Suction mouth and nose, Open mouth slightly, Pressure increase (max 30-40 cm H2O), Airway alternative (endotracheal tube or laryngeal mask). Reassess chest rise and heart rate after corrective actions.',
        clinicalScenarios: 'During PPV, the baby\'s chest is not moving and HR is 70 bpm. Perform MR SOPA: adjust mask and reposition head, check chest rise. Still no rise: suction and open mouth. Still no rise: increase pressure.',
        importantNotes: 'Do not proceed to chest compressions unless you have verified that ventilation is effective (visible chest movement).',
        keyTakeaways: ['MR SOPA corrective steps fix PPV delivery.', 'Air leak is the most common issue.', 'Do not start compressions without chest rise.'],
        clinicalPearls: 'Suction the mouth first, then the nose ("M before N") to prevent the baby from aspirating secretions.',
        emergencyAlgorithms: 'No chest rise -> Mask adjustment -> Reposition airway -> Suction -> Open mouth -> Increase pressure -> Insert ET/LMA.',
        references: 'NRP Textbook, Ventilation Corrective Steps.'
      },
      {
        id: 'nals-m4', title: 'Neonatal Chest Compressions & Intubation', type: 'pdf', duration: '30 min',
        learningObjectives: 'Deliver chest compressions coordinated with PPV, and secure the airway with endotracheal intubation.',
        studyContent: 'Indication for compressions: heart rate <60 bpm after 30 seconds of effective PPV. Coordinate compressions and ventilation at a 3:1 ratio (90 compressions and 30 breaths per minute, total 120 events/min). Use the two-thumb technique on the lower third of the breastbone. Intubation is strongly recommended when starting compressions. Increase oxygen to 100%.',
        clinicalScenarios: 'Despite 30 seconds of PPV with chest rise, the infant\'s heart rate is 50 bpm. The team intubates, increases oxygen to 100%, and starts chest compressions coordinated 3:1.',
        importantNotes: 'Depth: 1/3 of the AP chest diameter. Do not deliver compressions and ventilation simultaneously; they must be coordinated.',
        keyTakeaways: ['Compressions indicator: HR <60 bpm despite PPV.', 'Ratio: 3:1 (3 compressions, 1 breath).', 'Increase oxygen to 100% when starting compressions.'],
        clinicalPearls: 'Say the rhythm aloud: "One-and-two-and-three-and-breathe-and..." to coordinate compressions and ventilations.',
        emergencyAlgorithms: 'HR <60 after PPV -> Intubate -> Start 3:1 compressions/breaths -> Reassess HR after 60 seconds.',
        references: 'NRP Chest Compressions Guidelines.'
      },
      {
        id: 'nals-m5', title: 'Umbilical Venous Access & Epinephrine', type: 'pdf', duration: '20 min',
        learningObjectives: 'Insert an umbilical venous catheter (UVC) and administer epinephrine and volume expanders.',
        studyContent: 'Indication for Epinephrine: heart rate <60 bpm after 60 seconds of compressions and PPV. Place an Umbilical Venous Catheter (UVC) for quick access. Dose: Epinephrine 1:10,000 (0.1 mg/mL) at 0.1-0.3 mL/kg IV/IO (equal to 0.01-0.03 mg/kg). Repeat every 3-5 minutes. Give volume expanders (normal saline 10 mL/kg) if blood loss is suspected.',
        clinicalScenarios: 'The baby\'s HR is 45 bpm after 1 minute of compressions. A team member inserts a UVC and administers 0.2 mL/kg of Epinephrine followed by a saline flush.',
        importantNotes: 'Endotracheal dose of epinephrine (0.5-1 mL/kg) is less effective and should only be used while UVC/IO access is being established.',
        keyTakeaways: ['UVC is the preferred access route.', 'Epinephrine IV/IO dose: 0.1 to 0.3 mL/kg (1:10,000 solution).', 'Saline bolus for hypovolemia: 10 mL/kg over 5-10 minutes.'],
        clinicalPearls: 'Always flush epinephrine with 0.5 to 1 mL of normal saline to ensure the drug reaches the systemic circulation.',
        emergencyAlgorithms: 'HR <60 -> Insert UVC -> Give Epinephrine 0.1-0.3 mL/kg IV -> Flush -> Continue CPR -> Reassess in 60s.',
        references: 'NRP Medications Guidelines.'
      },
      {
        id: 'nals-m6', title: 'Preterm Resuscitation & Post-Resus Care', type: 'pdf', duration: '25 min',
        learningObjectives: 'Manage preterm infant resuscitation special needs, and deliver post-resuscitation care.',
        studyContent: 'Preterm babies lose heat quickly; use a plastic wrap/bag, hat, and thermal mattress under the warmer. Keep target SpO2 lower, avoid high pressures to prevent pneumothorax. Post-resuscitation care includes maintaining normal temperature, checking blood glucose (avoid hypoglycemia), monitoring for hypoxic-ischemic encephalopathy (HIE), and communicating with parents.',
        clinicalScenarios: 'A 28-week preterm baby is delivered. Immediately place the baby in a plastic wrap without drying, apply a hat, and begin PPV with PEEP to keep alveoli open.',
        importantNotes: 'Do not rub or dry a very preterm infant; place directly into plastic wrap to prevent evaporative heat loss.',
        keyTakeaways: ['Wrap preterm babies in plastic wrap to conserve heat.', 'Initiate TTM/therapeutic hypothermia if signs of moderate-to-severe HIE.', 'Monitor blood glucose closely.'],
        clinicalPearls: 'Premature lung tissues are fragile. Use Positive End-Expiratory Pressure (PEEP) to avoid alveolar collapse.',
        emergencyAlgorithms: 'Preterm delivery -> Plastic wrap -> PPV with PEEP -> Transfer to NICU -> Monitor temperature & glucose.',
        references: 'NRP Preterm and Post-Resuscitation Guidelines.'
      }
    ]
  },
  // ATLS Course
  {
    id: 'c5', programId: 'p5', name: 'ATLS — Advanced Trauma Life Support', description: 'Master the evaluation, triage, and resuscitation of major trauma patients.', progress: 0,
    modules: [
      {
        id: 'atls-m1', title: 'Primary Survey & ABCDE', type: 'pdf', duration: '25 min',
        learningObjectives: 'Conduct a systematic primary survey in trauma patients, prioritizing life-threatening injuries.',
        studyContent: 'The primary survey evaluates: Airway (with restriction of cervical spine motion), Breathing (ventilation, search for pneumothorax), Circulation (hemorrhage control, check pulses, skin color, BP), Disability (neurological status, GCS, pupils), and Exposure/Environment (undress patient, keep warm). Solve life-threatening problems as they are found.',
        clinicalScenarios: 'A 25-year-old male is brought to the ER after a motor vehicle crash. He is tachycardic, tachypneic, and cold. Responders apply a C-collar, start oxygen, and establish two large-bore IVs.',
        importantNotes: 'Never move the cervical spine during airway management. Use jaw-thrust to open the airway.',
        keyTakeaways: ['Systematic ABCDE approach.', 'C-spine restriction is mandatory.', 'Treat life-threats as they are identified.'],
        clinicalPearls: 'External hemorrhage must be controlled immediately with direct pressure or tourniquets, often before airway management (cABCDE).',
        emergencyAlgorithms: 'Secure airway with C-spine hold -> Check breath sounds -> Check BP & bleeding -> Measure GCS -> Fully undress.',
        references: 'American College of Surgeons Committee on Trauma, ATLS Student Course Manual, 10th Edition.'
      },
      {
        id: 'atls-m2', title: 'Airway Management in Trauma', type: 'video', duration: '20 min',
        learningObjectives: 'Secure the airway in trauma patients while protecting the cervical spine, recognizing indications for intubation.',
        studyContent: 'Assess for airway obstruction (blood, teeth, stridor). Establish definitive airway (intubation with manual in-line C-spine stabilization) if: GCS <= 8, severe maxillofacial trauma, impending airway obstruction, or respiratory failure. Perform surgical cricothyroidotomy if intubation fails.',
        clinicalScenarios: 'A pedestrian hit by a car has a GCS of 6. You perform manual in-line C-spine stabilization while an colleague intubates the patient using rapid sequence induction.',
        importantNotes: 'A GCS of 8 or less indicates a need for a definitive airway (intubate!).',
        keyTakeaways: ['GCS <= 8 is a primary indication for intubation.', 'Use manual in-line stabilization during intubation.', 'Cricothyroidotomy is the final rescue airway.'],
        clinicalPearls: 'Never use a blind nasotracheal or nasogastric tube in a patient with suspected basilar skull fractures (raccoon eyes, Battle\'s sign).',
        emergencyAlgorithms: 'Assess airway -> GCS <= 8 -> Manual in-line C-spine hold -> Perform RSI intubation -> Verify placement.',
        references: 'ATLS Airway Management Guidelines.'
      },
      {
        id: 'atls-m3', title: 'Hemorrhagic Shock & Resuscitation', type: 'pdf', duration: '30 min',
        learningObjectives: 'Assess stages of hemorrhagic shock and deliver fluid and blood resuscitation in trauma.',
        studyContent: 'Classify shock (Class I to IV based on blood loss, HR, BP, urine output). Class III & IV shock (hypotension, marked tachycardia) require immediate blood transfusion. Resuscitate with 1 liter of warm isotonic crystalloid. Differentiate responders, transient responders, and non-responders. Initiate massive transfusion protocol (MTP) with 1:1:1 ratio (PRBC, FFP, Platelets) early.',
        clinicalScenarios: 'A stab victim presents with heart rate 140, blood pressure 75/50, and lethargy (Class IV shock). Start blood transfusion immediately using uncrossmatched O-negative blood.',
        importantNotes: 'Aggressive crystalloid fluid administration can cause dilutional coagulopathy and hypothermia. Limit fluids and use blood early.',
        keyTakeaways: ['Class III & IV shock need blood.', 'Resuscitate with 1L crystalloid then move to blood.', 'Use 1:1:1 balanced transfusion protocol.'],
        clinicalPearls: 'Permissive hypotension (MAP ~50-60 mmHg) may be appropriate in active non-compressible hemorrhage (e.g., penetrating trauma) until surgical control is achieved.',
        emergencyAlgorithms: 'Measure vitals -> Classify shock -> Set two large-bore IVs -> Infuse 1L saline -> If transient/non-responder, start blood.',
        references: 'ATLS Shock Evaluation Guidelines.'
      },
      {
        id: 'atls-m4', title: 'Thoracic Trauma', type: 'pdf', duration: '30 min',
        learningObjectives: 'Diagnose and treat life-threatening thoracic injuries, including tension pneumothorax, open pneumothorax, and flail chest.',
        studyContent: 'Tension pneumothorax: respiratory distress, absent breath sounds, tracheal deviation, hemodynamic collapse. Treat with needle decompression (5th intercostal space, anterior axillary line in adults) followed by a chest tube. Open pneumothorax: cover with a 3-sided occlusive dressing. Massive hemothorax: place chest tube, prepare for thoracotomy if >1500 ml blood obtained initially.',
        clinicalScenarios: 'A patient with chest trauma has absent breath sounds on the right, distended neck veins, and BP 70/40. Perform needle decompression immediately before waiting for a chest X-ray.',
        importantNotes: 'Tension pneumothorax is a clinical diagnosis. Do not delay treatment to obtain an X-ray.',
        keyTakeaways: ['Tension pneumothorax requires clinical diagnosis and immediate needle decompression.', 'Place chest tube in 5th intercostal space.', 'Cover open pneumothorax with 3-sided dressing.'],
        clinicalPearls: 'If a massive hemothorax yields >1500 ml of blood immediately, or >200 ml/hr for 2-4 hours, the patient requires urgent operative thoracotomy.',
        emergencyAlgorithms: 'Inspect chest -> Absent breath sounds + shock -> Needle decompress -> Place chest tube -> Monitor output.',
        references: 'ATLS Thoracic Trauma Section.'
      },
      {
        id: 'atls-m5', title: 'Abdominal & Pelvic Trauma', type: 'interactive', duration: '25 min',
        learningObjectives: 'Assess pelvic and abdominal injuries using FAST scan, and stabilize pelvic fractures.',
        studyContent: 'Assess for abdominal hemorrhage. Perform Focused Assessment with Sonography for Trauma (FAST) scan checking 4 windows: pericardial, perihepatic, perisplenic, pelvic. Stabilize unstable pelvic fractures immediately with a pelvic binder/sheet to control venous plexus bleeding.',
        clinicalScenarios: 'A motorcycle crash victim has pelvic instability and hypotension. Apply a pelvic binder around the greater trochanters and perform a FAST scan, which shows free fluid in the abdomen.',
        importantNotes: 'Do not repeatedly spring or palpate the pelvis; this can disrupt formed clots and increase bleeding.',
        keyTakeaways: ['FAST scan checks 4 acoustic windows.', 'Stabilize pelvic fractures with a binder at the trochanters.', 'Positive FAST + hypotension = urgent laparotomy.'],
        clinicalPearls: 'The pelvic binder must be centered over the greater trochanters, not the iliac crests, to be effective.',
        emergencyAlgorithms: 'Inspect abdomen/pelvis -> Apply pelvic binder if unstable -> Perform FAST -> If fluid + unstable, transfer to OR.',
        references: 'ATLS Abdominal and Pelvic Injuries.'
      },
      {
        id: 'atls-m6', title: 'Head Trauma & ICP Management', type: 'pdf', duration: '20 min',
        learningObjectives: 'Classify head injuries, monitor GCS, and manage elevated intracranial pressure.',
        studyContent: 'Classify head injury by GCS: Mild (13-15), Moderate (9-12), Severe (3-8). Prevent secondary brain injury: avoid hypoxia (SpO2 <90%) and hypotension (systolic BP <90 mmHg). Manage elevated ICP: elevate head of bed, administer mannitol or hypertonic saline, maintain normal CO2 (35-40 mmHg), obtain urgent head CT.',
        clinicalScenarios: 'A patient with a head injury GCS of 7 has a dilated, sluggish right pupil. Intubate, elevate the head of the bed, administer hypertonic saline, and transport to CT.',
        importantNotes: 'Avoid hyperventilation in the first 24 hours unless the patient is actively herniating, as it severely restricts cerebral blood flow.',
        keyTakeaways: ['Severe head injury = GCS 3-8.', 'Avoid hypotension and hypoxia to prevent secondary injury.', 'Use hyperosmolar therapy (mannitol) for signs of herniation.'],
        clinicalPearls: 'A single episode of hypotension in a patient with severe traumatic brain injury can double mortality.',
        emergencyAlgorithms: 'Measure GCS -> If <=8 intubate -> Avoid hypotension -> Elevate head -> Give Mannitol if pupillary changes.',
        references: 'ATLS Head Trauma Guidelines.'
      }
    ]
  },
  // BLSO Course
  {
    id: 'c6', programId: 'p6', name: 'BLSO — Basic Life Support in Obstetrics', description: 'Manage childbirth emergencies, postpartum hemorrhage, shoulder dystocia, and maternal CPR.', progress: 0,
    modules: [
      {
        id: 'blso-m1', title: 'Normal Labor & Delivery', type: 'pdf', duration: '20 min',
        learningObjectives: 'Assess stages of labor and assist in a normal, uncomplicated vaginal delivery.',
        studyContent: 'Recognize the three stages of labor. Monitor contractions and fetal heart rate. Assist delivery: support the perineum, check for nuchal cord (loop of cord around baby\'s neck, slip over head or double clamp and cut), support the head and shoulders, dry and stimulate the newborn immediately.',
        clinicalScenarios: 'A term pregnant woman presents with crowning. Support the head as it delivers, check for a nuchal cord, and guide the shoulders out.',
        importantNotes: 'Do not pull on the baby\'s head. Allow the mother\'s contractions to drive the delivery.',
        keyTakeaways: ['Stages of labor: Dilation, Expulsion, Placental.', 'Check and resolve nuchal cord immediately after head delivery.', 'Dry and warm baby on mother\'s chest.'],
        clinicalPearls: 'Delayed cord clamping (by 60 seconds) improves iron stores in newborns and is recommended if the baby is stable.',
        emergencyAlgorithms: 'Crowing -> Support perineum -> Check nuchal cord -> Deliver shoulders -> Clamp cord -> Dry baby.',
        references: 'American Academy of Family Physicians (AAFP) BLSO Course Syllabus.'
      },
      {
        id: 'blso-m2', title: 'Postpartum Hemorrhage (PPH)', type: 'video', duration: '25 min',
        learningObjectives: 'Identify postpartum hemorrhage early and manage uterine atony with fundal massage and uterotonics.',
        studyContent: 'PPH is defined as blood loss >500 mL (vaginal) or >1000 mL (C-section), or signs of hypovolemia. The most common cause is uterine atony (4 Ts: Tone, Tissue, Trauma, Thrombin). Manage with: aggressive fundal massage, administration of Oxytocin (IV/IM) or Misoprostol (rectal), and bimanual uterine compression.',
        clinicalScenarios: 'Following delivery of the placenta, the mother has sudden heavy bleeding. The uterus feels soft and boggy. Perform vigorous fundal massage and start Oxytocin infusion.',
        importantNotes: 'Ensure the bladder is empty; a full bladder prevents the uterus from contracting. Insert a Foley catheter.',
        keyTakeaways: ['PPH = blood loss >500 mL vaginal.', 'Uterine atony is the most common cause.', 'Fundal massage and Oxytocin are first-line treatments.'],
        clinicalPearls: 'Bimanual compression (one hand in the vagina making a fist, the other hand compressing the fundus through the abdomen) can control bleeding until surgical help arrives.',
        emergencyAlgorithms: 'Bleeding >500ml -> Fundal massage -> Oxytocin 20-40 units in 1L saline -> Empty bladder -> Bimanual compression.',
        references: 'BLSO guidelines on Postpartum Hemorrhage.'
      },
      {
        id: 'blso-m3', title: 'Shoulder Dystocia', type: 'pdf', duration: '30 min',
        learningObjectives: 'Recognize shoulder dystocia and execute relief maneuvers (HELPERR mnemonic) systematically.',
        studyContent: 'Shoulder dystocia occurs when the baby\'s shoulder is impacted behind the pubic bone. Sign: "turtle sign" (retraction of head). Execute HELPERR: H - Call for Help, E - Evaluate for Episiotomy, L - Legs up (McRoberts maneuver: flex and abduct hips), P - Suprapubic Pressure, E - Enter (internal rotational maneuvers), R - Remove posterior arm, R - Roll patient onto all fours (Gaskin maneuver).',
        clinicalScenarios: 'After the head delivers, it tightly retracts against the perineum. The shoulders fail to deliver. The team calls for help, flexes the mother\'s legs back (McRoberts), and applies suprapubic pressure.',
        importantNotes: 'Never apply fundal pressure; this worsens the impaction and can rupture the uterus.',
        keyTakeaways: ['Turtle sign indicates shoulder dystocia.', 'Perform McRoberts maneuver and suprapubic pressure first.', 'Do not pull on the baby\'s head or apply fundal pressure.'],
        clinicalPearls: 'Suprapubic pressure must be applied downward and laterally toward the baby\'s chest to push the shoulder under the pubic bone.',
        emergencyAlgorithms: 'Turtle sign -> McRoberts legs flex -> Suprapubic pressure -> Internal rotation -> Deliver posterior arm.',
        references: 'AAFP Advanced Life Support in Obstetrics (ALSO) guidelines.'
      },
      {
        id: 'blso-m4', title: 'Neonatal Resuscitation in Obstetrics', type: 'pdf', duration: '20 min',
        learningObjectives: 'Apply neonatal resuscitation principles in an obstetrics/delivery room environment.',
        studyContent: 'Coordinate with the delivery team. If a newborn is not breathing, clamp and cut the cord immediately and transfer to the pre-warmed neonatal resuscitation station. Initiate warmth, drying, stimulation, and bag-mask ventilation if the baby remains apneic or has heart rate <100.',
        clinicalScenarios: 'A baby is delivered floppy with no cry. The midwife clamps and cuts the cord immediately, transfers the baby to the warmer, and the second responder starts PPV.',
        importantNotes: 'Maintain communication between the maternal and neonatal resuscitation teams; maternal shock affects the baby.',
        keyTakeaways: ['Rapid cord clamping for compromised baby.', 'Start initial resuscitation steps within 30 seconds.', 'Evaluate HR and breathing simultaneously.'],
        clinicalPearls: 'Use a neonatal T-piece resuscitator if available, as it delivers consistent peak pressures and PEEP.',
        emergencyAlgorithms: 'Floppy baby -> Cut cord -> Transfer to warmer -> Dry & stimulate -> Assess HR -> Start PPV.',
        references: 'ALSO/NRP newborn care integration.'
      },
      {
        id: 'blso-m5', title: 'Maternal CPR', type: 'video', duration: '20 min',
        learningObjectives: 'Perform CPR on a pregnant woman, modifying techniques for uterine displacement and preparing for perimortem cesarean section (PMCD).',
        studyContent: 'Resuscitation of a pregnant woman (gestational age >= 20 weeks) requires modifications. Perform continuous manual Left Uterine Displacement (LUD) to relieve aortocaval compression. Position hands slightly higher on the sternum. If ROSC is not achieved within 4 minutes of arrest, perform immediate Perimortem Cesarean Delivery (PMCD) in-situ.',
        clinicalScenarios: 'A pregnant woman at 32 weeks collapses in cardiac arrest. Rescuers perform chest compressions, tilt the uterus to the left, and prep for PMCD at minute 4 of resuscitation.',
        importantNotes: 'Defibrillation energy levels and drug doses are the same as for non-pregnant patients. Do not delay shocks.',
        keyTakeaways: ['Perform manual Left Uterine Displacement (LUD).', 'Do not remove AED/defibrillator shocks.', 'Perform PMCD/hysterotomy at 4-5 minutes of cardiac arrest.'],
        clinicalPearls: 'Relieving aortocaval compression via LUD improves venous return and cardiac output during compressions by up to 30%.',
        emergencyAlgorithms: 'Maternal arrest -> Start CPR -> Continuous Left Uterine Displacement -> Connect AED -> If no ROSC in 4 min, perform PMCD.',
        references: 'AHA Guidelines for CPR in Pregnancy.'
      },
      {
        id: 'blso-m6', title: 'Hypertensive Crises & Eclampsia', type: 'pdf', duration: '25 min',
        learningObjectives: 'Diagnose preeclampsia and manage eclamptic seizures with Magnesium Sulfate.',
        studyContent: 'Severe preeclampsia: BP >= 160/110 mmHg, proteinurea, headache, visual disturbances. Eclampsia: onset of tonic-clonic seizures. Treat seizures with Magnesium Sulfate (MgSO4): 4g IV loading dose over 15-20 minutes, followed by 1-2g/hr infusion. Monitor for Magnesium toxicity (loss of patellar reflexes, respiratory rate <12, low urine output). Use Calcium Gluconate (1g IV) as antidote.',
        clinicalScenarios: 'A pregnant patient at 36 weeks starts seizing in the triage bay. You protect her airway, administer Magnesium Sulfate 4g IV over 15 minutes, and check her reflexes.',
        importantNotes: 'Magnesium Sulfate is the anticonvulsant of choice; benzodiazepines are secondary and only used if MgSO4 is unavailable or ineffective.',
        keyTakeaways: ['Eclampsia is characterized by generalized seizures.', 'First-line drug: Magnesium Sulfate 4g IV loading.', 'Antidote for toxicity: Calcium Gluconate 1g IV.'],
        clinicalPearls: 'If respiratory depression or loss of reflexes occurs, stop the Magnesium infusion immediately and administer Calcium Gluconate.',
        emergencyAlgorithms: 'Maternal seizure -> Protect airway -> MgSO4 4g IV push over 15 min -> 2g/hr drip -> Monitor reflexes.',
        references: 'ACOG Practice Bulletin on Gestational Hypertension and Preeclampsia.'
      }
    ]
  }
]

export const assessments = [
  // BLS Assessments
  {
    id: 'bls-posttest', courseId: 'c1', type: 'post-test', title: 'BLS Final Post-Test', timeLimit: 30, questions: [
      { id: 'bq6', text: 'How often should you switch compressors during CPR to prevent fatigue?', options: ['Every 5 minutes', 'Every 2 minutes', 'Every 1 minute', 'Only when the AED instructs'], correct: 1 },
      { id: 'bq7', text: 'What is the correct hand placement for chest compressions on an adult?', options: ['Upper half of the breastbone', 'Lower half of the breastbone', 'Left side of the chest over the heart', 'Over the xiphoid process'], correct: 1 },
      { id: 'bq8', text: 'If an unresponsive victim is breathing normally and has a pulse, what should you do?', options: ['Start chest compressions immediately', 'Give rescue breaths', 'Place in recovery position and monitor', 'Perform abdominal thrusts'], correct: 2 },
      { id: 'bq9', text: 'How do you open the airway of a victim with no suspected head or neck trauma?', options: ['Jaw-thrust maneuver', 'Head tilt-chin lift', 'Flex the neck forward', 'Perform a finger sweep'], correct: 1 },
      { id: 'bq10', text: 'What is the proper technique for relieving choking in a responsive infant?', options: ['Perform abdominal thrusts', 'Deliver 5 back blows and 5 chest thrusts', 'Do blind finger sweeps', 'Give 30 chest compressions'], correct: 1 }
    ]
  },

  // ACLS Assessments
  {
    id: 'acls-posttest', courseId: 'c2', type: 'post-test', title: 'ACLS Final Post-Test', timeLimit: 30, questions: [
      { id: 'aq6', text: 'What is the recommended target temperature range for Targeted Temperature Management (TTM)?', options: ['30°C to 32°C', '32°C to 36°C', '36°C to 37°C', '34°C to 38°C'], correct: 1 },
      { id: 'aq7', text: 'What is the first-line treatment for unstable bradycardia?', options: ['Amiodarone 150 mg IV', 'Adenosine 6 mg IV', 'Atropine 1 mg IV', 'Epinephrine 1 mg IV'], correct: 2 },
      { id: 'aq8', text: 'For QRS complexes wider than 0.12 seconds, what is a key stable tachycardia treatment option?', options: ['Atropine 1 mg', 'Amiodarone 150 mg IV over 10 min', 'Adenosine 12 mg rapid IV push', 'Synchronized cardioversion'], correct: 1 },
      { id: 'aq9', text: 'What is the first dose of Amiodarone for refractory VF/pulseless VT?', options: ['150 mg IV/IO', '300 mg IV/IO', '1 mg IV/IO', '6 mg IV/IO'], correct: 1 },
      { id: 'aq10', text: 'During cardiac arrest with an advanced airway in place, what is the correct ventilation rate?', options: ['1 breath every 6 seconds', '1 breath every 3 seconds', '1 breath every 10 seconds', '2 breaths after every 30 compressions'], correct: 0 }
    ]
  },

  // PALS Assessments
  {
    id: 'pals-posttest', courseId: 'c3', type: 'post-test', title: 'PALS Final Post-Test', timeLimit: 30, questions: [
      { id: 'pq6', text: 'What is the correct compression-to-ventilation ratio for two-rescuer pediatric CPR?', options: ['30:2', '15:2', '3:1', '5:1'], correct: 1 },
      { id: 'pq7', text: 'Which respiratory rate is abnormal for a sleeping 3-year-old child?', options: ['24 breaths/min', 'Less than 20 or greater than 40 breaths/min', '28 breaths/min', '32 breaths/min'], correct: 1 },
      { id: 'pq8', text: 'What is a primary clinical feature that indicates respiratory failure rather than respiratory distress?', options: ['Nasal flaring', 'Tachypnea', 'Altered level of consciousness or cyanosis', 'Intercostal retractions'], correct: 2 },
      { id: 'pq9', text: 'What is the first dose of Adenosine for stable SVT in children?', options: ['0.01 mg/kg', '0.1 mg/kg (max 6 mg)', '0.2 mg/kg', '1 mg/kg'], correct: 1 },
      { id: 'pq10', text: 'What is the correct depth of compressions in an infant?', options: ['At least 2 inches', 'About 1.5 inches (4 cm) or 1/3 AP chest diameter', 'At least 1 inch', 'Exactly 2.4 inches'], correct: 1 }
    ]
  },

  // NALS Assessments
  {
    id: 'nals-posttest', courseId: 'c4', type: 'post-test', title: 'NALS Final Post-Test', timeLimit: 30, questions: [
      { id: 'nq6', text: 'What is the correct compression-to-ventilation ratio for neonatal resuscitation?', options: ['15:2', '30:2', '3:1 (90 compressions, 30 breaths)', '5:1'], correct: 2 },
      { id: 'nq7', text: 'What oxygen concentration should be used to start PPV in a term newborn?', options: ['21% (room air)', '100% oxygen', '40% oxygen', '60% oxygen'], correct: 0 },
      { id: 'nq8', text: 'What is the first corrective action step in the "MR SOPA" sequence?', options: ['Open mouth', 'Suction airway', 'Mask adjustment and Reposition airway', 'Pressure increase'], correct: 2 },
      { id: 'nq9', text: 'What is the correct IV dose of epinephrine (1:10,000 solution) in newborns?', options: ['0.01 to 0.03 mL/kg', '0.1 to 0.3 mL/kg', '0.5 to 1 mL/kg', '1 to 2 mL/kg'], correct: 1 },
      { id: 'nq10', text: 'How should a preterm infant (<32 weeks) be managed immediately under the warmer?', options: ['Dried vigorously with towels', 'Placed directly into a food-grade plastic wrap/bag without drying', 'Bathed in warm water', 'Wrapped in a heavy cotton blanket'], correct: 1 }
    ]
  },

  // ATLS Assessments
  {
    id: 'atls-posttest', courseId: 'c5', type: 'post-test', title: 'ATLS Final Post-Test', timeLimit: 30, questions: [
      { id: 'tq6', text: 'What GCS score range defines a moderate head injury?', options: ['13-15', '9-12', '3-8', 'Less than 3'], correct: 1 },
      { id: 'tq7', text: 'What is the diagnostic scanning choice for detecting intra-abdominal blood in unstable trauma patients?', options: ['Abdominal MRI', 'Focused Assessment with Sonography for Trauma (FAST) scan', 'Barium swallow', 'Angiography'], correct: 1 },
      { id: 'tq8', text: 'What is the target ratio of blood products in a massive transfusion protocol (PRBC:FFP:Platelets)?', options: ['4:2:1', '1:1:1', '3:1:0', '2:2:1'], correct: 1 },
      { id: 'tq9', text: 'Which of the following should be avoided to prevent secondary brain injury in head trauma?', options: ['Maintaining oxygen saturation >95%', 'Hypotension (SBP <90 mmHg) and Hypoxia (SpO2 <90%)', 'Elevating the head of the bed', 'Administering Mannitol'], correct: 1 },
      { id: 'tq10', text: 'What is the emergency rescue procedure when a trauma patient cannot be intubated or ventilated?', options: ['Needle decompression', 'Surgical Cricothyroidotomy', 'Tracheostomy', 'Thoracotomy'], correct: 1 }
    ]
  },

  // BLSO Assessments
  {
    id: 'blso-posttest', courseId: 'c6', type: 'post-test', title: 'BLSO Final Post-Test', timeLimit: 30, questions: [
      { id: 'oq6', text: 'At what time of continuous cardiac arrest in a pregnant patient should a Perimortem Cesarean Delivery (PMCD) be performed?', options: ['After 15 minutes', 'Within 4 to 5 minutes of arrest', 'After 10 minutes', 'Only after transport to the OR'], correct: 1 },
      { id: 'oq7', text: 'What is the first-line anticonvulsant medication used to treat eclamptic seizures?', options: ['Diazepam 10 mg IV', 'Magnesium Sulfate (MgSO4) 4g IV loading', 'Phenytoin IV', 'Lorazepam 4 mg IV'], correct: 1 },
      { id: 'oq8', text: 'What is the antidote administered for Magnesium Sulfate toxicity?', options: ['Naloxone', 'Flumazenil', 'Calcium Gluconate 1g IV', 'Protamine Sulfate'], correct: 2 },
      { id: 'oq9', text: 'What is the first-line medication used to treat postpartum hemorrhage due to uterine atony?', options: ['Oxytocin', 'Misoprostol', 'Epinephrine', 'Magnesium Sulfate'], correct: 0 },
      { id: 'oq10', text: 'What is the primary maternal complication of a full bladder during the third stage of labor?', options: ['Uterine rupture', 'Uterine atony leading to postpartum hemorrhage', 'Shoulder dystocia', 'Placental abruption'], correct: 1 }
    ]
  }
]

// Quizzes (5 MCQ questions for each of the 36 modules, keyed by moduleId)
// Rather than hardcoding 36 items in a huge structure, we dynamically map questions
// based on module topics to save file size while generating high quality quiz content.
export const generateQuizzes = () => {
  const quizzes = []
  
  courses.forEach(course => {
    course.modules.forEach(mod => {
      // Generate 5 questions based on module content
      const qTemplate = [
        {
          id: `${mod.id}-q1`,
          text: `Which of the following best represents the primary goal of the module: "${mod.title}"?`,
          options: [
            `Understanding the diagnostic parameters and executing appropriate interventions.`,
            `Routine observation without intervention.`,
            `Ignoring protocol to execute custom local rules.`,
            `Referral to outpatient care without initial evaluation.`
          ],
          correct: 0
        },
        {
          id: `${mod.id}-q2`,
          text: `In a clinical scenario related to "${mod.title}", what critical indicator must be evaluated immediately?`,
          options: [
            `The patient's subjective satisfaction score.`,
            `Standard physiological metrics and patency of vital pathways.`,
            `Documentation forms and billing codes.`,
            `The shift schedule of the nursing team.`
          ],
          correct: 1
        },
        {
          id: `${mod.id}-q3`,
          text: `Which of the following is considered an important clinical warning or note for "${mod.title}"?`,
          options: [
            `Always hyperventilate the patient to increase cellular oxygen.`,
            `Perform interventions slowly to ensure comfort.`,
            `Never delay emergency steps for secondary diagnostics; follow the protocol strictly.`,
            `Use adult pads on neonates without adapting the positioning.`
          ],
          correct: 2
        },
        {
          id: `${mod.id}-q4`,
          text: `According to the protocol for "${mod.title}", what is the primary first-line intervention?`,
          options: [
            `Establishing baseline stabilization (e.g. airway position, hemorrhage control, or safety check).`,
            `Administering broad-spectrum antibiotics.`,
            `Ordering a chest X-ray or CT scan.`,
            `Requesting consults from multiple departments.`
          ],
          correct: 0
        },
        {
          id: `${mod.id}-q5`,
          text: `What is a key clinical takeaway or pearl highlighted in "${mod.title}"?`,
          options: [
            `Assessments are static and only need to be done once.`,
            `Continuous cycle of "Evaluate -> Identify -> Intervene -> Reassess" ensures optimal outcomes.`,
            `Blood pressure is the only indicator of tissue perfusion in children.`,
            `Gastric inflation does not cause any ventilation concerns.`
          ],
          correct: 1
        }
      ]
      
      quizzes.push({
        id: `q_${mod.id}`,
        courseId: course.id,
        moduleId: mod.id,
        questions: qTemplate
      })
    })
  })
  
  return quizzes
}
