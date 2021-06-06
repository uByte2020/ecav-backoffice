import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

// Pages
import User from "@/pages/Dashboard/Pages/UserProfile.vue";
import Login from "@/pages/Dashboard/Pages/Login.vue";
import Register from "@/pages/Dashboard/Pages/Register.vue";
import FormacaoDetalhe from "@/pages/Dashboard/Pages/FormacaoDetalhe.vue";

// TableList pages
import TableMarcacao from "@/pages/Dashboard/Tables/TableMarcacao.vue";
import UsersTable from "@/pages/Dashboard/Tables/UsersTable.vue";
import FormacoesTable from "@/pages/Dashboard/Tables/FormacoesTable.vue";
import LicoesTable from "@/pages/Dashboard/Tables/LicoesTable.vue";

// Calendar
import Calendar from "@/pages/Dashboard/Calendar.vue";

import store from "@/store";

let authPages = {
    path: "/",
    component: AuthLayout,
    name: "Authentication",
    children: [{
            path: "/login",
            name: "Login",
            component: Login,
            meta: {
                allowAnonymous: true,
            },
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: {
                allowAnonymous: true,
            },
        },
        {
            path: "/reset-password",
            name: "ResetPassword",
            component: () =>
                import ("../pages/Dashboard/Pages/ResetPasswordEmail.vue"),
            meta: {
                allowAnonymous: true,
            },
        },
        {
            path: "/new-password/:resetToken",
            name: "NovaPasse",
            component: () =>
                import ("../pages/Dashboard/Pages/ResetPasswordNewPassword.vue"),
            meta: {
                allowAnonymous: true,
            },
            props: true,
        },
        // {
        //   path: "/lock",
        //   name: "Lock",
        //   component: Lock,
        //   meta: {
        //     allowAnonymous: true,
        //   },
        // }
    ],
};

const routes = [{
        path: "/",
        redirect: "/dashboard",
        name: "Home",
    },
    authPages,
    {
        path: "/",
        component: DashboardLayout,
        children: [{
                path: "dashboard",
                name: "Dashboard",
                components: { default: Dashboard },
            },
            {
                path: "user",
                name: "Perfil",
                components: { default: User },
            },
            {
                path: "calendario",
                name: "Calendario das Marcações",
                components: { default: Calendar },
            },
            {
                path: "marcacoes",
                name: "Marcações",
                components: { default: TableMarcacao },
            },
            {
                path: "users",
                name: "Utilizadores",
                components: { default: UsersTable },
                // beforeEnter(to, from, next) {
                //   if (store.getters['userModule/restrictTo'](0)) {
                //     next();
                //   } else {
                //     next('/');
                //   }
                // },
            },
            {
                path: "licoes",
                name: "Lições",
                components: { default: LicoesTable },
            },
            {
                path: "formacoes",
                name: "Formações",
                components: { default: FormacoesTable },
            },
            {
                path: "formacoes-detalhe/:formacaoId",
                name: "Formação Detalhe",
                component: FormacaoDetalhe,
                props: true,
                // beforeEnter(to, from, next) {
                //   if (store.getters['userModule/restrictTo'](0)) {
                //     next();
                //   } else {
                //     next('/');
                //   }
                // },
            },
            {
                path: "*",
                name: "Página não encontrada",
                component: () =>
                    import ("../pages/Dashboard/Pages/NotFound.vue"),
            },
        ],
    },
];

export default routes;