import type { ErrorCode } from "./Type.js";

export const ValidationError : ErrorCode= {
    code : 400,
    error: "Invalid request schema",
    success : false
}

export const ValidationErrorDuplicateEmail : ErrorCode= {
    code : 400,
    error: "Email already exists",
    success : false
}

export const UnauthorizedError : ErrorCode= {
    code : 401,
    error: "Unauthorized, token missing or invalid",
    success : false
}

export const ForbiddenRoleCheck : ErrorCode= {
    code : 403,
    error: "Forbidden, teacher access required",
    success : false
}

export const ForbiddenOwnershipCheck : ErrorCode= {
    code : 403,
    error: "Forbidden, not class teacher",
    success : false
}

export const NotFoundClass : ErrorCode= {
    code : 404,
    error: "Class not found",
    success : false
}

export const NotFoundUser : ErrorCode= {
    code : 404,
    error: "User not found",
    success : false
}

export const NotFoundStudent : ErrorCode= {
    code : 404,
    error: "Student not found",
    success : false
}


