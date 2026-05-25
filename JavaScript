/* -------------------------------------------------------------
   LÓGICA JAVASCRIPT DO PROJETO ESTÁTICO
   ------------------------------------------------------------- */

// 1. FAQ Accordion funcional
document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('.faq-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// 2. Rastreamento e redirecionamento de checkout
function trackCheckout(plan) {
  var checkoutUrl = '';
  var eventData = {};

  if (plan === 'basic') {
    checkoutUrl = 'https://pay.wiapy.com/4z6GN4Yqp5';
    eventData = {
      content_name: 'Planejamento Express BNCC - Pacote Básico',
      content_category: 'Infoproduto Educacional',
      currency: 'BRL',
      value: 10.00
    };
  }

  if (plan === 'complete') {
    checkoutUrl = 'https://pay.wiapy.com/BF76aZO1Cw';
    eventData = {
      content_name: 'Planejamento Express BNCC - Pacote Completo',
      content_category: 'Infoproduto Educacional',
      currency: 'BRL',
      value: 27.00
    };
  }

  try {
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', eventData);
    }
  } catch (e) {
    console.log('Erro ao disparar Meta Pixel:', e);
  }

  // Redirecionamento com leve delay para garantir o disparo do pixel
  setTimeout(function() {
    window.location.href = checkoutUrl;
  }, 300);
}
