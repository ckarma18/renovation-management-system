package com.karma.renovation.exception;

import com.karma.renovation.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // VALIDATION ERRORS
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>>
    handleValidationExceptions(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(fieldError -> {

                    String fieldName =
                            fieldError.getField();

                    String errorMessage =
                            fieldError.getDefaultMessage();

                    errors.put(fieldName, errorMessage);
                });

        ApiResponse<Map<String, String>> response =
                new ApiResponse<>(
                        false,
                        "Validation failed.",
                        errors
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    // RESOURCE NOT FOUND ERROR
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>>
    handleResourceNotFoundException(
            ResourceNotFoundException exception) {

        ApiResponse<Object> response =
                new ApiResponse<>(
                        false,
                        exception.getMessage(),
                        null
                );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}