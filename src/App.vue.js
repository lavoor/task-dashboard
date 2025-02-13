"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var SearchBar_vue_1 = require("./components/SearchBar.vue");
var Sorting_vue_1 = require("./components/Sorting.vue");
var Filters_vue_1 = require("./components/Filters.vue");
var AddButton_vue_1 = require("./components/AddButton.vue");
var TaskListItem_vue_1 = require("./components/TaskListItem.vue");
var TaskCardItem_vue_1 = require("./components/TaskCardItem.vue");
var OptionList_vue_1 = require("./components/OptionList.vue");
var OptionCards_vue_1 = require("./components/OptionCards.vue");
var AddTask_vue_1 = require("./components/AddTask.vue");
var EditTask_vue_1 = require("./components/EditTask.vue");
var checkTaskArray_1 = require("./utils/checkTaskArray");
var tasks = (0, vue_1.ref)([]);
var darkMode = (0, vue_1.ref)(false);
var toggleDarkMode = function () {
    darkMode.value = !darkMode.value;
    localStorage.setItem('userDarkMode', JSON.stringify(darkMode.value));
};
var getUserDarkMode = function () {
    var userDarkMode = localStorage.getItem('userDarkMode');
    if (userDarkMode) {
        darkMode.value = JSON.parse(userDarkMode);
    }
};
var handleBeforeLeave = function (element) {
    var el = element;
    var _a = window.getComputedStyle(el), marginLeft = _a.marginLeft, marginTop = _a.marginTop, width = _a.width, height = _a.height;
    element.setAttribute("style", "\n        left: ".concat(el.offsetLeft - parseInt(marginLeft), "px;\n        top: ").concat(el.offsetTop - parseInt(marginTop), "px;\n        width: ").concat(width, ";\n        height: ").concat(height, ";\n    "));
};
var visibleTasks = (0, vue_1.ref)([]);
var addTaskDialog = (0, vue_1.ref)(false);
var editTaskDialog = (0, vue_1.ref)(false);
var showAddTaskDialog = function () {
    addTaskDialog.value = true;
};
var hideAddTaskDialog = function () {
    addTaskDialog.value = false;
};
var showEditTaskDialog = function (task) {
    editTaskDialog.value = true;
    currentTaskEditing.value = task;
};
var hideEditTaskDialog = function () {
    editTaskDialog.value = false;
    currentTaskEditing.value = {
        id: '',
        title: '',
        description: '',
        status: 'todo',
        createdAt: ''
    };
};
var currentTaskEditing = (0, vue_1.ref)({
    id: '',
    title: '',
    description: '',
    status: 'todo',
    createdAt: ''
});
var tasksStyle = (0, vue_1.ref)('list');
var chooseTaskStyle = function (option) {
    tasksStyle.value = option;
    localStorage.setItem('userTasksStyle', option);
};
var getUserTaskStyle = function () {
    var taskStyle = localStorage.getItem('userTasksStyle');
    if (taskStyle) {
        tasksStyle.value = taskStyle;
    }
};
var filters = (0, vue_1.ref)([]);
var sorting = (0, vue_1.ref)('newest');
var searchValue = (0, vue_1.ref)('');
var debounceTime = 500;
var debounceTimeout = (0, vue_1.ref)(null);
var searchTasks = function (value) {
    searchValue.value = value;
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = setTimeout(function () {
        filterTasks();
    }, debounceTime);
};
var addFilters = function (filterId) {
    if (filters.value.includes(filterId)) {
        filters.value = filters.value.filter(function (item) { return item !== filterId; });
    }
    else {
        filters.value = __spreadArray(__spreadArray([], filters.value, true), [filterId], false);
    }
    filterTasks();
};
var sortTasks = function (option) {
    sorting.value = option;
    filterTasks();
};
var filterTasks = function () {
    var searchedTasks = tasks.value.filter(function (task) {
        if (searchValue.value === '') {
            return true;
        }
        var searchValueNormalized = searchValue.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        var taskTitleNormalized = task.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        var taskDescriptionNormalized = task.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return taskTitleNormalized.includes(searchValueNormalized) || taskDescriptionNormalized.includes(searchValueNormalized);
    });
    var filteredTasks = searchedTasks.filter(function (task) {
        if (filters.value.length === 0) {
            return true;
        }
        return filters.value.includes(task.status);
    });
    var sortedTasks = filteredTasks.sort(function (a, b) {
        if (sorting.value === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
    });
    visibleTasks.value = sortedTasks;
};
var createTask = function (task) {
    localStorage.setItem('tasks', JSON.stringify(__spreadArray(__spreadArray([], tasks.value, true), [task], false)));
    tasks.value = __spreadArray(__spreadArray([], tasks.value, true), [task], false);
    filterTasks();
};
var getUserTasks = function () {
    var userTasks = localStorage.getItem('tasks');
    if (userTasks) {
        try {
            var parsedTasks = JSON.parse(userTasks);
            if ((0, checkTaskArray_1.isTaskArray)(parsedTasks)) {
                tasks.value = parsedTasks;
                return;
            }
        }
        catch (e) {
            console.error("Błąd parsowania danych z localStorage:", e);
        }
    }
    tasks.value = [
        {
            id: "1",
            title: "Zrobić zakupy",
            description: "Mleko, chleb, jajka, woda",
            status: "todo",
            createdAt: "2025-02-01T10:00:00"
        },
        {
            id: "2",
            title: "Zrobić pranie",
            description: "Pamiętaj o proszku do prania",
            status: "inprogress",
            createdAt: "2025-02-02T11:00:00"
        },
        {
            id: "3",
            title: "Zrobić obiad",
            description: "Makaron z sosem pomidorowym",
            status: "done",
            createdAt: "2025-02-03T12:00:00"
        },
        {
            id: "4",
            title: "Posprzątać pokój",
            description: "Odkurzyć i umyć podłogę",
            status: "todo",
            createdAt: "2025-02-04T13:00:00"
        },
        {
            id: "5",
            title: "Napisać raport",
            description: "Raport z wynikami sprzedaży za ostatni miesiąc",
            status: "inprogress",
            createdAt: "2025-02-05T14:00:00"
        },
        {
            id: "6",
            title: "Zadzwonić do klienta",
            description: "Omówić szczegóły zamówienia",
            status: "done",
            createdAt: "2025-02-06T15:00:00"
        },
        {
            id: "7",
            title: "Zarezerwować bilety",
            description: "Bilety na koncert w przyszłym miesiącu",
            status: "todo",
            createdAt: "2025-02-07T16:00:00"
        },
        {
            id: "8",
            title: "Przeczytać książkę",
            description: "Dokończyć czytanie książki 'Sztuka wojny'",
            status: "inprogress",
            createdAt: "2025-02-08T17:00:00"
        },
        {
            id: "9",
            title: "Zrobić backup",
            description: "Backup wszystkich ważnych plików na dysk zewnętrzny",
            status: "done",
            createdAt: "2025-02-09T18:00:00"
        },
        {
            id: "10",
            title: "Naprawić rower",
            description: "Wymienić dętkę i nasmarować łańcuch",
            status: "todo",
            createdAt: "2025-02-10T19:00:00"
        },
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
};
var deleteTask = function (uuid) {
    var newTasks = tasks.value.filter(function (task) { return task.id !== uuid; });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    tasks.value = newTasks;
    filterTasks();
};
var editTask = function (task) {
    var newTasks = tasks.value.map(function (item) {
        if (item.id === task.id) {
            return task;
        }
        return item;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    tasks.value = newTasks;
    filterTasks();
};
var taskDone = function (uuid) {
    var newTasks = tasks.value.map(function (task) {
        if (task.id === uuid) {
            return __assign(__assign({}, task), { status: "done" });
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    tasks.value = newTasks;
    filterTasks();
};
(0, vue_1.onBeforeMount)(function () {
    getUserTaskStyle();
    getUserTasks();
    getUserDarkMode();
});
(0, vue_1.onMounted)(function () {
    filterTasks();
}); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_components;
    var __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("bg-stone-50 dark:bg-stone-900 min-h-screen min-w-screen duration-150") }, { class: ((__VLS_ctx.darkMode ? 'dark' : '')) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("container py-16 flex flex-col gap-6") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("w-full flex justify-between items-center") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: ("font-inter text-2xl text-stone-800 dark:text-stone-50 font-semibold") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ onClick: (__VLS_ctx.toggleDarkMode) }, { class: ("text-stone-400 cursor-pointer group hover:animate-rotate-hover") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(__assign({ xmlns: ("http://www.w3.org/2000/svg"), width: ("16"), height: ("17"), viewBox: ("0 0 16 17"), fill: ("none") }, { class: ("fill-transparent group-hover:fill-stone-400 dark:fill-stone-400 dark:hover:fill-transparent transition-colors duration-150") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
        d: ("M13.4443 7.72844H15M14.2221 6.95066V8.50622M7.99917 1.50622C8.10185 1.50622 8.20375 1.50622 8.30487 1.50622C7.30557 2.43466 6.66324 3.68388 6.48954 5.03673C6.31584 6.38958 6.62175 7.76051 7.3541 8.91123C8.08645 10.062 9.19893 10.9197 10.4982 11.3354C11.7974 11.751 13.2012 11.6983 14.4656 11.1864C13.9792 12.3566 13.1843 13.3728 12.1656 14.1266C11.1469 14.8805 9.94264 15.3437 8.68129 15.4669C7.41994 15.59 6.14881 15.3685 5.00349 14.826C3.85817 14.2834 2.88163 13.4402 2.17802 12.3862C1.47442 11.3323 1.07015 10.1071 1.00833 8.84142C0.94652 7.57573 1.22948 6.31701 1.82703 5.19951C2.42459 4.08201 3.31432 3.14766 4.40132 2.49613C5.48832 1.84459 6.73182 1.50031 7.99917 1.5V1.50622ZM11.8885 2.284C11.8885 2.69656 12.0524 3.09222 12.3442 3.38394C12.6359 3.67566 13.0316 3.83955 13.4443 3.83955C13.0316 3.83955 12.6359 4.00344 12.3442 4.29516C12.0524 4.58689 11.8885 4.98255 11.8885 5.39511C11.8885 4.98255 11.7246 4.58689 11.4328 4.29516C11.1411 4.00344 10.7454 3.83955 10.3328 3.83955C10.7454 3.83955 11.1411 3.67566 11.4328 3.38394C11.7246 3.09222 11.8885 2.69656 11.8885 2.284Z"),
        stroke: ("currentColor"),
        'stroke-width': ("1.6"),
        'stroke-linecap': ("round"),
        'stroke-linejoin': ("round"),
    });
    // @ts-ignore
    /** @type { [typeof SearchBar, ] } */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(SearchBar_vue_1.default, new SearchBar_vue_1.default({
        searchTasks: ((__VLS_ctx.searchTasks)),
    }));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
            searchTasks: ((__VLS_ctx.searchTasks)),
        }], __VLS_functionalComponentArgsRest(__VLS_0), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("w-full flex items-center justify-between") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("flex items-center gap-4 sm:gap-9") }));
    // @ts-ignore
    /** @type { [typeof Sorting, ] } */ ;
    // @ts-ignore
    var __VLS_5 = __VLS_asFunctionalComponent(Sorting_vue_1.default, new Sorting_vue_1.default({
        sortTasks: ((__VLS_ctx.sortTasks)),
    }));
    var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{
            sortTasks: ((__VLS_ctx.sortTasks)),
        }], __VLS_functionalComponentArgsRest(__VLS_5), false));
    // @ts-ignore
    /** @type { [typeof Filters, ] } */ ;
    // @ts-ignore
    var __VLS_10 = __VLS_asFunctionalComponent(Filters_vue_1.default, new Filters_vue_1.default({
        addFilters: ((__VLS_ctx.addFilters)),
    }));
    var __VLS_11 = __VLS_10.apply(void 0, __spreadArray([{
            addFilters: ((__VLS_ctx.addFilters)),
        }], __VLS_functionalComponentArgsRest(__VLS_10), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("flex items-center gap-3") }));
    // @ts-ignore
    /** @type { [typeof OptionList, ] } */ ;
    // @ts-ignore
    var __VLS_15 = __VLS_asFunctionalComponent(OptionList_vue_1.default, new OptionList_vue_1.default({
        selected: ((__VLS_ctx.tasksStyle === 'list')),
        chooseOption: ((__VLS_ctx.chooseTaskStyle)),
    }));
    var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
            selected: ((__VLS_ctx.tasksStyle === 'list')),
            chooseOption: ((__VLS_ctx.chooseTaskStyle)),
        }], __VLS_functionalComponentArgsRest(__VLS_15), false));
    // @ts-ignore
    /** @type { [typeof OptionCards, ] } */ ;
    // @ts-ignore
    var __VLS_20 = __VLS_asFunctionalComponent(OptionCards_vue_1.default, new OptionCards_vue_1.default({
        selected: ((__VLS_ctx.tasksStyle === 'cards')),
        chooseOption: ((__VLS_ctx.chooseTaskStyle)),
    }));
    var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([{
            selected: ((__VLS_ctx.tasksStyle === 'cards')),
            chooseOption: ((__VLS_ctx.chooseTaskStyle)),
        }], __VLS_functionalComponentArgsRest(__VLS_20), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("flex flex-col w-full") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("w-full flex flex-col") }));
    // @ts-ignore
    /** @type { [typeof AddButton, ] } */ ;
    // @ts-ignore
    var __VLS_25 = __VLS_asFunctionalComponent(AddButton_vue_1.default, new AddButton_vue_1.default(__assign({ 'onClick': {} })));
    var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_25), false));
    var __VLS_30;
    var __VLS_31 = {
        onClick: (__VLS_ctx.showAddTaskDialog)
    };
    var __VLS_27;
    var __VLS_28;
    var __VLS_29;
    if (__VLS_ctx.tasksStyle === 'cards' && __VLS_ctx.visibleTasks.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        var __VLS_32 = {}.TransitionGroup;
        /** @type { [typeof __VLS_components.TransitionGroup, typeof __VLS_components.TransitionGroup, ] } */ ;
        // @ts-ignore
        var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(__assign(__assign(__assign({ 'onBeforeLeave': {} }, { name: ("taskCard"), tag: ("div") }), { class: ("w-full flex flex-col lg:grid lg:grid-cols-2 gap-5") }), { appear: (true) })));
        var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onBeforeLeave': {} }, { name: ("taskCard"), tag: ("div") }), { class: ("w-full flex flex-col lg:grid lg:grid-cols-2 gap-5") }), { appear: (true) })], __VLS_functionalComponentArgsRest(__VLS_33), false));
        var __VLS_38 = void 0;
        var __VLS_39 = {
            onBeforeLeave: (__VLS_ctx.handleBeforeLeave)
        };
        var __VLS_35 = void 0;
        var __VLS_36 = void 0;
        for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.visibleTasks)); _i < _a.length; _i++) {
            var task = _a[_i][0];
            // @ts-ignore
            /** @type { [typeof TaskCardItem, ] } */ ;
            // @ts-ignore
            var __VLS_40 = __VLS_asFunctionalComponent(TaskCardItem_vue_1.default, new TaskCardItem_vue_1.default({
                key: ((task.id)),
                taskDone: ((__VLS_ctx.taskDone)),
                showEditTaskDialog: ((__VLS_ctx.showEditTaskDialog)),
                deleteTask: ((__VLS_ctx.deleteTask)),
                task: ((task)),
            }));
            var __VLS_41 = __VLS_40.apply(void 0, __spreadArray([{
                    key: ((task.id)),
                    taskDone: ((__VLS_ctx.taskDone)),
                    showEditTaskDialog: ((__VLS_ctx.showEditTaskDialog)),
                    deleteTask: ((__VLS_ctx.deleteTask)),
                    task: ((task)),
                }], __VLS_functionalComponentArgsRest(__VLS_40), false));
        }
        __VLS_37.slots.default;
        var __VLS_37;
    }
    else if (__VLS_ctx.visibleTasks.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        var __VLS_45 = {}.TransitionGroup;
        /** @type { [typeof __VLS_components.TransitionGroup, typeof __VLS_components.TransitionGroup, ] } */ ;
        // @ts-ignore
        var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            name: ("taskList"),
            tag: ("div"),
            appear: (true),
        }));
        var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([{
                name: ("taskList"),
                tag: ("div"),
                appear: (true),
            }], __VLS_functionalComponentArgsRest(__VLS_46), false));
        for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.visibleTasks)); _b < _c.length; _b++) {
            var task = _c[_b][0];
            // @ts-ignore
            /** @type { [typeof TaskListItem, ] } */ ;
            // @ts-ignore
            var __VLS_51 = __VLS_asFunctionalComponent(TaskListItem_vue_1.default, new TaskListItem_vue_1.default({
                key: ((task.id)),
                taskDone: ((__VLS_ctx.taskDone)),
                showEditTaskDialog: ((__VLS_ctx.showEditTaskDialog)),
                deleteTask: ((__VLS_ctx.deleteTask)),
                task: ((task)),
            }));
            var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
                    key: ((task.id)),
                    taskDone: ((__VLS_ctx.taskDone)),
                    showEditTaskDialog: ((__VLS_ctx.showEditTaskDialog)),
                    deleteTask: ((__VLS_ctx.deleteTask)),
                    task: ((task)),
                }], __VLS_functionalComponentArgsRest(__VLS_51), false));
        }
        __VLS_50.slots.default;
        var __VLS_50;
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("w-full") }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: ("font-inter font-medium text-stone-500 dark:stone-400") }));
    }
    var __VLS_56 = {}.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */ ;
    // @ts-ignore
    var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
    var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_57), false));
    if (__VLS_ctx.addTaskDialog) {
        // @ts-ignore
        /** @type { [typeof AddTask, ] } */ ;
        // @ts-ignore
        var __VLS_62 = __VLS_asFunctionalComponent(AddTask_vue_1.default, new AddTask_vue_1.default({
            createTask: ((__VLS_ctx.createTask)),
            hideAddTaskDialog: ((__VLS_ctx.hideAddTaskDialog)),
        }));
        var __VLS_63 = __VLS_62.apply(void 0, __spreadArray([{
                createTask: ((__VLS_ctx.createTask)),
                hideAddTaskDialog: ((__VLS_ctx.hideAddTaskDialog)),
            }], __VLS_functionalComponentArgsRest(__VLS_62), false));
    }
    __VLS_61.slots.default;
    var __VLS_61;
    var __VLS_67 = {}.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */ ;
    // @ts-ignore
    var __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
    var __VLS_69 = __VLS_68.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_68), false));
    if (__VLS_ctx.editTaskDialog) {
        // @ts-ignore
        /** @type { [typeof EditTask, ] } */ ;
        // @ts-ignore
        var __VLS_73 = __VLS_asFunctionalComponent(EditTask_vue_1.default, new EditTask_vue_1.default({
            task: ((__VLS_ctx.currentTaskEditing)),
            editTask: ((__VLS_ctx.editTask)),
            hideEditTaskDialog: ((__VLS_ctx.hideEditTaskDialog)),
        }));
        var __VLS_74 = __VLS_73.apply(void 0, __spreadArray([{
                task: ((__VLS_ctx.currentTaskEditing)),
                editTask: ((__VLS_ctx.editTask)),
                hideEditTaskDialog: ((__VLS_ctx.hideEditTaskDialog)),
            }], __VLS_functionalComponentArgsRest(__VLS_73), false));
    }
    __VLS_72.slots.default;
    var __VLS_72;
    ['bg-stone-50', 'dark:bg-stone-900', 'min-h-screen', 'min-w-screen', 'duration-150', 'container', 'py-16', 'flex', 'flex-col', 'gap-6', 'w-full', 'flex', 'justify-between', 'items-center', 'font-inter', 'text-2xl', 'text-stone-800', 'dark:text-stone-50', 'font-semibold', 'text-stone-400', 'cursor-pointer', 'group', 'hover:animate-rotate-hover', 'fill-transparent', 'group-hover:fill-stone-400', 'dark:fill-stone-400', 'dark:hover:fill-transparent', 'transition-colors', 'duration-150', 'w-full', 'flex', 'items-center', 'justify-between', 'flex', 'items-center', 'gap-4', 'sm:gap-9', 'flex', 'items-center', 'gap-3', 'flex', 'flex-col', 'w-full', 'w-full', 'flex', 'flex-col', 'w-full', 'flex', 'flex-col', 'lg:grid', 'lg:grid-cols-2', 'gap-5', 'w-full', 'font-inter', 'font-medium', 'text-stone-500', 'dark:stone-400',];
    var __VLS_slots;
    var $slots;
    var __VLS_inheritedAttrs;
    var $attrs;
    var __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            SearchBar: SearchBar_vue_1.default,
            Sorting: Sorting_vue_1.default,
            Filters: Filters_vue_1.default,
            AddButton: AddButton_vue_1.default,
            TaskListItem: TaskListItem_vue_1.default,
            TaskCardItem: TaskCardItem_vue_1.default,
            OptionList: OptionList_vue_1.default,
            OptionCards: OptionCards_vue_1.default,
            AddTask: AddTask_vue_1.default,
            EditTask: EditTask_vue_1.default,
            darkMode: darkMode,
            toggleDarkMode: toggleDarkMode,
            handleBeforeLeave: handleBeforeLeave,
            visibleTasks: visibleTasks,
            addTaskDialog: addTaskDialog,
            editTaskDialog: editTaskDialog,
            showAddTaskDialog: showAddTaskDialog,
            hideAddTaskDialog: hideAddTaskDialog,
            showEditTaskDialog: showEditTaskDialog,
            hideEditTaskDialog: hideEditTaskDialog,
            currentTaskEditing: currentTaskEditing,
            tasksStyle: tasksStyle,
            chooseTaskStyle: chooseTaskStyle,
            searchTasks: searchTasks,
            addFilters: addFilters,
            sortTasks: sortTasks,
            createTask: createTask,
            deleteTask: deleteTask,
            editTask: editTask,
            taskDone: taskDone,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
