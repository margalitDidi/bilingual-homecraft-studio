import type { ContentMap } from "./site.functions";

/**
 * Built-in text shown only when the backend cannot be reached.
 * The site stays readable instead of blanking; real editable content comes from the database.
 */
export const DEFAULT_CONTENT: ContentMap = {
  brand_name: { he: "סטודיו לעיצוב פנים", en: "Interior Design Studio" },
  brand_tagline: { he: "מטבחים · חדרי רחצה · ארונות", en: "Kitchens · Bathrooms · Wardrobes" },

  hero_eyebrow: { he: "עיצוב פנים בהתאמה אישית", en: "Bespoke interior design" },
  hero_title: { he: "מטבחים שנבנים סביב החיים שלך", en: "Kitchens built around the way you live" },
  hero_subtitle: {
    he: "סטודיו לעיצוב פנים המתמחה במטבחים, חדרי רחצה, ארונות וספריות — מהסקיצה הראשונה ועד המסירה.",
    en: "An interior studio specialising in bespoke kitchens, bathrooms, wardrobes and libraries — from the first sketch to handover.",
  },

  stat_1_value: { he: "12+", en: "12+" },
  stat_1_label: { he: "שנות ניסיון", en: "Years of experience" },
  stat_2_value: { he: "150+", en: "150+" },
  stat_2_label: { he: "פרויקטים שהושלמו", en: "Completed projects" },
  stat_3_value: { he: "100%", en: "100%" },
  stat_3_label: { he: "ליווי אישי", en: "Personal guidance" },

  about_title: { he: "הסטודיו", en: "The studio" },
  about_text: {
    he: "עיצוב מתחיל מהקשבה. כל פרויקט נפתח בשיחה על הדרך שבה אתם חיים את הבית — ואז נבנה סביבה: תכנון מדויק, חומרים שנבחרו בקפידה וליווי צמוד מהסקיצה הראשונה ועד המסירה.",
    en: "Design starts with listening. Every project begins with a conversation about how you live in your home — then it is built around that: precise planning, carefully chosen materials and close guidance from the first sketch to handover.",
  },

  service_kitchen_title: { he: "מטבחים", en: "Kitchens" },
  service_kitchen_text: {
    he: "המטבח הוא לב הבית. מתכננים מידה אחר מידה, עד שהכל נמצא בדיוק במקומו.",
    en: "The kitchen is the heart of the home. Planned to the millimetre, until everything has its place.",
  },
  service_bathroom_title: { he: "חדרי רחצה", en: "Bathrooms" },
  service_bathroom_text: {
    he: "חדרי רחצה רגועים, פרקטיים ומדויקים — בחומרים שעומדים בשימוש יומיומי.",
    en: "Calm, practical and precise bathrooms — in materials that stand up to daily use.",
  },
  service_closets_title: { he: "ארונות וספריות", en: "Wardrobes & Libraries" },
  service_closets_text: {
    he: "פתרונות אחסון מותאמים לכל חדר בבית, עד הפרט הקטן ביותר.",
    en: "Storage solutions fitted to every room in the house, down to the smallest detail.",
  },

  process_title: { he: "איך עובדים יחד", en: "How we work together" },
  process_1_title: { he: "היכרות", en: "Introduction" },
  process_1_text: { he: "שיחה ראשונה על הצרכים, התקציב ולוח הזמנים.", en: "A first conversation about needs, budget and timeline." },
  process_2_title: { he: "תכנון", en: "Planning" },
  process_2_text: { he: "סקיצות, תלת־ממד ובחירת חומרים.", en: "Sketches, 3D views and material selection." },
  process_3_title: { he: "ביצוע", en: "Execution" },
  process_3_text: { he: "תיאום ספקים ופיקוח על העבודה בשטח.", en: "Coordinating suppliers and supervising the work on site." },
  process_4_title: { he: "מסירה", en: "Handover" },
  process_4_text: { he: "בדיקה אחרונה, התקנה וסיום.", en: "A final check, installation and finishing." },

  cta_title: { he: "בואו נדבר על הבית שלכם", en: "Let's talk about your home" },
  cta_text: {
    he: "השאירו פרטים ואחזור אליכם לתיאום פגישת ייעוץ.",
    en: "Leave your details and I'll get back to you to arrange a consultation.",
  },
};

/** Keys the site reads through c() / raw(); used by the fallback test. */
export const CONTENT_KEYS = Object.keys(DEFAULT_CONTENT);
