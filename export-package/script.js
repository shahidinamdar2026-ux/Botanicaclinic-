/**
 * Botanica Dental Clinic - Narayangaon, Pune
 * Interactive script: WhatsApp integration, Smile Estimator, Modals & Mobile Nav
 */

const CLINIC_PHONE = "7378671779";
const CLINIC_PHONE_INTL = "917378671779";

function openWhatsApp(customText) {
  const text = customText || "Hello Botanica Dental, I would like to book an appointment at your Narayangaon, Pune clinic.";
  const url = `https://wa.me/${CLINIC_PHONE_INTL}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function callClinic() {
  window.location.href = `tel:${CLINIC_PHONE}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Interactive Smile & Treatment Cost Estimator
  const estimatorItems = document.querySelectorAll('.estimator-item');
  const totalPriceDisplay = document.getElementById('estimatorTotalPrice');
  const emiDisplay = document.getElementById('estimatorEmi');
  const bookEstimatorBtn = document.getElementById('bookEstimatorBtn');

  function updateEstimator() {
    let total = 0;
    const selectedTitles = [];

    estimatorItems.forEach(item => {
      const checkbox = item.querySelector('.estimator-checkbox');
      const price = parseInt(item.getAttribute('data-price'), 10) || 0;
      const title = item.querySelector('.estimator-item-title')?.textContent || '';

      if (checkbox && checkbox.checked) {
        item.classList.add('active');
        total += price;
        selectedTitles.push(title);
      } else {
        item.classList.remove('active');
      }
    });

    if (totalPriceDisplay) {
      totalPriceDisplay.textContent = `₹${total.toLocaleString()}`;
    }

    if (emiDisplay) {
      const emi = Math.round(total / 12);
      emiDisplay.innerHTML = `*Flexible EMI options available starting from <strong style="color: #f5d5a8;">₹${emi.toLocaleString()}/month</strong>.`;
    }

    if (bookEstimatorBtn) {
      bookEstimatorBtn.onclick = () => {
        const listStr = selectedTitles.length > 0 ? selectedTitles.join(', ') : 'Custom Dental Care';
        const msg = `Hello Botanica Dental, I estimated my custom smile plan (₹${total.toLocaleString()} INR for: ${listStr}) and would like to book an consultation at your Narayangaon, Pune clinic.`;
        openWhatsApp(msg);
      };
    }
  }

  estimatorItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const checkbox = item.querySelector('.estimator-checkbox');
      if (checkbox && e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      updateEstimator();
    });

    const checkbox = item.querySelector('.estimator-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', updateEstimator);
    }
  });

  // Initial estimator calculation
  updateEstimator();

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 4. Booking Modal
  const bookingModal = document.getElementById('bookingModal');
  const openBookingBtns = document.querySelectorAll('.trigger-booking-modal');
  const closeBookingBtn = document.getElementById('closeBookingModal');
  const serviceSelect = document.getElementById('modalServiceSelect');
  const doctorSelect = document.getElementById('modalDoctorSelect');
  const bookingForm = document.getElementById('directBookingForm');

  window.openBookingModalWith = (serviceId, doctorName) => {
    if (serviceSelect && serviceId) serviceSelect.value = serviceId;
    if (doctorSelect && doctorName) doctorSelect.value = doctorName;
    if (bookingModal) bookingModal.classList.add('open');
  };

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.getAttribute('data-service') || '';
      const doctor = btn.getAttribute('data-doctor') || '';
      window.openBookingModalWith(service, doctor);
    });
  });

  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', () => {
      bookingModal.classList.remove('open');
    });

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('open');
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patientName')?.value || 'Valued Patient';
      const patientPhone = document.getElementById('patientPhone')?.value || '';
      const service = serviceSelect?.value || 'General Consultation';
      const doctor = doctorSelect?.value || 'Any Available Specialist';
      const date = document.getElementById('appointmentDate')?.value || 'Upcoming date';

      const msg = `Hello Botanica Dental, I would like to confirm my appointment booking:\n- Name: ${patientName}\n- Contact: ${patientPhone}\n- Treatment: ${service}\n- Preferred Doctor: ${doctor}\n- Preferred Date: ${date}\nClinic: Narayangaon, Pune.`;
      
      openWhatsApp(msg);
      if (bookingModal) bookingModal.classList.remove('open');
    });
  }

  // 5. Legal Modal (Privacy, Terms, Cookies)
  const legalModal = document.getElementById('legalModal');
  const closeLegalBtn = document.getElementById('closeLegalModal');
  const legalTabBtns = document.querySelectorAll('.legal-tab-btn');
  const legalContents = document.querySelectorAll('.legal-tab-content');

  window.openLegalModal = (tabName) => {
    if (!legalModal) return;
    legalModal.classList.add('open');

    legalTabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
        btn.style.color = '#f5d5a8';
        btn.style.borderBottom = '2px solid #e5b882';
      } else {
        btn.classList.remove('active');
        btn.style.color = '#a8a29e';
        btn.style.borderBottom = 'none';
      }
    });

    legalContents.forEach(content => {
      if (content.id === `legal-content-${tabName}`) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  };

  legalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      window.openLegalModal(tabName);
    });
  });

  if (closeLegalBtn && legalModal) {
    closeLegalBtn.addEventListener('click', () => {
      legalModal.classList.remove('open');
    });

    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) {
        legalModal.classList.remove('open');
      }
    });
  }

  // 6. Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
  const customizeCookiesBtn = document.getElementById('customizeCookiesBtn');

  try {
    const savedPrefs = localStorage.getItem('botanica_cookie_preferences');
    if (!savedPrefs && cookieBanner) {
      setTimeout(() => {
        cookieBanner.style.display = 'block';
      }, 1500);
    }
  } catch (err) {
    console.warn(err);
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
      try {
        localStorage.setItem('botanica_cookie_preferences', JSON.stringify({ accepted: true, date: new Date().toISOString() }));
      } catch(e) {}
      if (cookieBanner) cookieBanner.style.display = 'none';
    });
  }

  if (customizeCookiesBtn) {
    customizeCookiesBtn.addEventListener('click', () => {
      if (cookieBanner) cookieBanner.style.display = 'none';
      window.openLegalModal('cookies');
    });
  }
});
