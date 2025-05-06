
    import gsap from 'https://esm.sh/gsap';
import CursorBlob from 'https://esm.sh/cursor-blob';

(() => {
    // Tạo phần tử con trỏ
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.innerHTML = `
        </div><div class="cursor">
          <div class="cursor__rim"></div>
          <div class="cursor__dot"></div>
        </div>

    `;
    document.body.appendChild(cursor);

    CursorBlob.registerGSAP(gsap);
    
    const cursorEl = document.querySelector('.cursor');
    const cursorRimEl = document.querySelector('.cursor__rim');
    const cursorDotEl = document.querySelector('.cursor__dot');
    
    const cursorBlob = new CursorBlob({
      cursorEl,
      cursorRimEl,
      cursorDotEl,
      duration: 0.8,
      ease: 'expo.out',
    });
})();
