// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ConversationRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConversationRequest _$ConversationRequestFromJson(Map<String, dynamic> json) =>
    ConversationRequest(
      receiver_id: json['receiver_id'] as String,
      sender_key_id: json['sender_key_id'] as String,
      receiver_key_id: json['receiver_key_id'] as String,
    );

Map<String, dynamic> _$ConversationRequestToJson(
        ConversationRequest instance) =>
    <String, dynamic>{
      'receiver_id': instance.receiver_id,
      'sender_key_id': instance.sender_key_id,
      'receiver_key_id': instance.receiver_key_id,
    };
