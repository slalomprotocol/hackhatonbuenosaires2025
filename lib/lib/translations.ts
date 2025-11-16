/**
 * Translations for SLALOM Protocol
 * English and Spanish (Latin America)
 */

export type Language = 'en' | 'es';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    createDish: string;
    community: string;
    tutorial: string;
    dotVIP: string;
  };
  
  // Homepage
  home: {
    title: string;
    subtitle: string;
    cta: string;
    beOurGuest: string;
    features: {
      title: string;
      feature1: string;
      feature2: string;
      feature3: string;
    };
  };
  
  // Tutorial
  tutorial: {
    title: string;
    subtitle: string;
    chapters: {
      intro: string;
      futures: string;
      lawrence: string;
      strategy: string;
      polkadot: string;
    };
  };
  
  // Create Dish
  createDish: {
    title: string;
    subtitle: string;
    stepTitle: string;
    pickIngredients: string;
    setAllocations: string;
    deployVault: string;
    continueBtn: string;
    selectedLabel: string;
  };
  
  // The Pass (Position Configuration)
  thePass: {
    title: string;
    subtitle: string;
    long: string;
    short: string;
    leverage: string;
    allocation: string;
    orderType: string;
    market: string;
    limit: string;
    total: string;
    sendToKitchen: string;
  };
  
  // The Kitchen (Evaluation)
  theKitchen: {
    title: string;
    cooking: string;
    evaluation: string;
    score: string;
    grade: string;
    approved: string;
    rejected: string;
    strengths: string;
    risks: string;
    deployVault: string;
    reviseStrategy: string;
  };
  
  // Community
  community: {
    title: string;
    subtitle: string;
    leaderboard: string;
    recentActivity: string;
    topChefs: string;
    strategies: string;
    avgScore: string;
  };
  
  // DOT VIP
  dotVIP: {
    title: string;
    subtitle: string;
    firstEver: string;
    vipJudge: string;
    whyDOT: string;
    secretSauce: string;
    learnMore: string;
    startCooking: string;
    viewActivity: string;
  };
  
  // Common
  common: {
    connectWallet: string;
    connecting: string;
    connected: string;
    disconnect: string;
    loading: string;
    error: string;
    success: string;
    close: string;
    cancel: string;
    confirm: string;
    back: string;
    next: string;
    poweredBy: string;
  };
  
  // Lawrence phrases
  lawrence: {
    welcome: string;
    excellent: string;
    goodJob: string;
    needsWork: string;
    dangerous: string;
    thinking: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      createDish: 'Create Dish',
      community: 'Community',
      tutorial: 'Tutorial',
      dotVIP: 'DOT VIP',
    },
    
    home: {
      title: 'Be Our Guest',
      subtitle: 'Where Disney magic meets DeFi trading. Create strategies as easy as ordering at your favorite restaurant.',
      cta: 'Start Cooking',
      beOurGuest: 'Be Our Guest',
      features: {
        title: 'Why SLALOM?',
        feature1: '🐼 Lawrence AI rates every crypto with Michelin stars',
        feature2: '⛓️ First platform bridging Polkadot + HyperLiquid',
        feature3: '🍽️ Trading made as simple as ordering dinner',
      },
    },
    
    tutorial: {
      title: "Lawrence's Storybook",
      subtitle: 'Learn trading like a bedtime story',
      chapters: {
        intro: 'Once Upon a Time',
        futures: 'What Are Futures?',
        lawrence: 'Meet Lawrence',
        strategy: 'Creating Your Dish',
        polkadot: 'The Magic of Polkadot',
      },
    },
    
    createDish: {
      title: 'Create Your Trading Dish',
      subtitle: '🐼 Pick your ingredients • Lawrence rates each one with Michelin stars',
      stepTitle: 'Step 1: Select Your Ingredients',
      pickIngredients: 'Pick Ingredients',
      setAllocations: 'Set Allocations',
      deployVault: 'Deploy Vault',
      continueBtn: 'Continue to The Pass',
      selectedLabel: 'Selected Ingredients',
    },
    
    thePass: {
      title: 'The Pass',
      subtitle: 'Configure your positions like a conductor orchestrating a symphony',
      long: 'LONG',
      short: 'SHORT',
      leverage: 'Leverage',
      allocation: 'Allocation',
      orderType: 'Order Type',
      market: 'MARKET',
      limit: 'LIMIT',
      total: 'Total',
      sendToKitchen: 'Send to Kitchen',
    },
    
    theKitchen: {
      title: 'The Kitchen',
      cooking: 'Lawrence is cooking...',
      evaluation: 'Lawrence Evaluation',
      score: 'Score',
      grade: 'Grade',
      approved: 'Approved',
      rejected: 'Rejected',
      strengths: 'Strengths',
      risks: 'Risks',
      deployVault: 'Deploy Vault',
      reviseStrategy: 'Revise Strategy',
    },
    
    community: {
      title: 'Community Kitchen',
      subtitle: 'See what other chefs are cooking',
      leaderboard: 'Top Chefs',
      recentActivity: 'Recent Activity',
      topChefs: 'Top Chefs',
      strategies: 'Strategies',
      avgScore: 'Avg Score',
    },
    
    dotVIP: {
      title: 'Meet Polkadot',
      subtitle: 'Our VIP Judge',
      firstEver: 'FIRST EVER',
      vipJudge: 'VIP JUDGE',
      whyDOT: 'Why DOT is Our VIP Judge',
      secretSauce: 'The Secret Sauce',
      learnMore: 'Learn How DOT Powers SLALOM',
      startCooking: 'Start Cooking with DOT',
      viewActivity: 'View On-Chain Activity',
    },
    
    common: {
      connectWallet: 'Connect Wallet',
      connecting: 'Connecting...',
      connected: 'Connected',
      disconnect: 'Disconnect',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      poweredBy: 'Powered by',
    },
    
    lawrence: {
      welcome: 'Welcome, chef! Let me guide you through this culinary journey.',
      excellent: 'Magnifique! This strategy is exquisite!',
      goodJob: 'Très bien! A solid strategy with good balance.',
      needsWork: 'Hmm, this needs some refinement, chef.',
      dangerous: 'Mon Dieu! This strategy is too risky!',
      thinking: 'Let me examine these ingredients carefully...',
    },
  },
  
  es: {
    nav: {
      home: 'Inicio',
      createDish: 'Crear Plato',
      community: 'Comunidad',
      tutorial: 'Tutorial',
      dotVIP: 'DOT VIP',
    },
    
    home: {
      title: 'Bienvenido',
      subtitle: 'Donde la magia de Disney se encuentra con el trading DeFi. Crea estrategias tan fácil como ordenar en tu restaurante favorito.',
      cta: 'Empezar a Cocinar',
      beOurGuest: 'Bienvenido',
      features: {
        title: '¿Por Qué SLALOM?',
        feature1: '🐼 Lawrence AI califica cada cripto con estrellas Michelin',
        feature2: '⛓️ Primera plataforma que conecta Polkadot + HyperLiquid',
        feature3: '🍽️ Trading tan simple como ordenar la cena',
      },
    },
    
    tutorial: {
      title: 'El Libro de Cuentos de Lawrence',
      subtitle: 'Aprende trading como un cuento antes de dormir',
      chapters: {
        intro: 'Érase Una Vez',
        futures: '¿Qué Son los Futuros?',
        lawrence: 'Conoce a Lawrence',
        strategy: 'Creando Tu Plato',
        polkadot: 'La Magia de Polkadot',
      },
    },
    
    createDish: {
      title: 'Crea Tu Plato de Trading',
      subtitle: '🐼 Elige tus ingredientes • Lawrence califica cada uno con estrellas Michelin',
      stepTitle: 'Paso 1: Selecciona Tus Ingredientes',
      pickIngredients: 'Elegir Ingredientes',
      setAllocations: 'Configurar Asignaciones',
      deployVault: 'Desplegar Bóveda',
      continueBtn: 'Continuar al Pase',
      selectedLabel: 'Ingredientes Seleccionados',
    },
    
    thePass: {
      title: 'El Pase',
      subtitle: 'Configura tus posiciones como un director orquestando una sinfonía',
      long: 'LARGO',
      short: 'CORTO',
      leverage: 'Apalancamiento',
      allocation: 'Asignación',
      orderType: 'Tipo de Orden',
      market: 'MERCADO',
      limit: 'LÍMITE',
      total: 'Total',
      sendToKitchen: 'Enviar a la Cocina',
    },
    
    theKitchen: {
      title: 'La Cocina',
      cooking: 'Lawrence está cocinando...',
      evaluation: 'Evaluación de Lawrence',
      score: 'Puntuación',
      grade: 'Calificación',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      strengths: 'Fortalezas',
      risks: 'Riesgos',
      deployVault: 'Desplegar Bóveda',
      reviseStrategy: 'Revisar Estrategia',
    },
    
    community: {
      title: 'Cocina Comunitaria',
      subtitle: 'Mira qué están cocinando otros chefs',
      leaderboard: 'Mejores Chefs',
      recentActivity: 'Actividad Reciente',
      topChefs: 'Mejores Chefs',
      strategies: 'Estrategias',
      avgScore: 'Puntuación Promedio',
    },
    
    dotVIP: {
      title: 'Conoce a Polkadot',
      subtitle: 'Nuestro Juez VIP',
      firstEver: 'EL PRIMERO',
      vipJudge: 'JUEZ VIP',
      whyDOT: 'Por Qué DOT es Nuestro Juez VIP',
      secretSauce: 'La Salsa Secreta',
      learnMore: 'Aprende Cómo DOT Impulsa SLALOM',
      startCooking: 'Empezar a Cocinar con DOT',
      viewActivity: 'Ver Actividad On-Chain',
    },
    
    common: {
      connectWallet: 'Conectar Billetera',
      connecting: 'Conectando...',
      connected: 'Conectado',
      disconnect: 'Desconectar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      back: 'Atrás',
      next: 'Siguiente',
      poweredBy: 'Impulsado por',
    },
    
    lawrence: {
      welcome: '¡Bienvenido, chef! Déjame guiarte en este viaje culinario.',
      excellent: '¡Magnifique! ¡Esta estrategia es exquisita!',
      goodJob: '¡Très bien! Una estrategia sólida con buen equilibrio.',
      needsWork: 'Hmm, esto necesita algo de refinamiento, chef.',
      dangerous: '¡Mon Dieu! ¡Esta estrategia es muy arriesgada!',
      thinking: 'Déjame examinar estos ingredientes cuidadosamente...',
    },
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('language') as Language) || 'en';
}

export function setCurrentLanguage(lang: Language): void {
  localStorage.setItem('language', lang);
}
