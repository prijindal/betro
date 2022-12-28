// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'MessageResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MessageResponse _$MessageResponseFromJson(Map<String, dynamic> json) =>
    MessageResponse(
      id: json['id'] as String,
      conversation_id: json['conversation_id'] as String,
      sender_id: json['sender_id'] as String,
      message: json['message'] as String,
      created_at: DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$MessageResponseToJson(MessageResponse instance) =>
    <String, dynamic>{
      'id': instance.id,
      'conversation_id': instance.conversation_id,
      'sender_id': instance.sender_id,
      'message': instance.message,
      'created_at': instance.created_at.toIso8601String(),
    };
