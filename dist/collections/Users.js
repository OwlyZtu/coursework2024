"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === 'admin')
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: false,
    },
    access: {
        read: adminsAndUser,
        create: function () { return true; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
    },
    fields: [
        {
            name: "role",
            defaultValue: 'user',
            required: true,
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
        }
    ],
};
