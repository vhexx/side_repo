//Parsley localization for Russian language
//Evgeni Makarov
//github.com/emakarov


// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

// Define then the messages
window.ParsleyConfig.i18n.ru = $.extend(window.ParsleyConfig.i18n.ru || {}, {
  defaultMessage: "������������ ��������.",
  type: {
    email:        "������� ����� ����������� �����.",
    url:          "������� URL �����.",
    number:       "������� �����.",
    integer:      "������� ����� �����.",
    digits:       "������� ������ �����.",
    alphanum:     "������� ��������-�������� ��������."
  },
  notblank:       "��� ���� ������ ���� ���������.",
  required:       "������������ ����.",
  pattern:        "��� �������� �����������.",
  min:            "��� �������� ������ ���� �� ����� ��� %s.",
  max:            "��� �������� ������ ���� �� ����� ��� %s.",
  range:          "��� �������� ������ ���� �� %s �� %s.",
  minlength:      "��� �������� ������ ��������� �� ����� %s ��������.",
  maxlength:      "��� �������� ������ ��������� �� ����� %s ��������.",
  length:         "��� �������� ������ ��������� �� %s �� %s ��������.",
  mincheck:       "�������� �� ����� %s ��������.",
  maxcheck:       "�������� �� ����� %s ��������.",
  check:          "�������� �� %s �� %s ��������.",
  equalto:        "��� �������� ������ ���������."
});

// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('ru', window.ParsleyConfig.i18n.ru, true);